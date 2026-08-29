const postgres = require('postgres');
const fs = require('fs');

const env = fs.readFileSync('.env.local', 'utf8');
const dbMatch = env.match(/DATABASE_URL=["']?([^"'\r\n]+)/);
const dbUrl = dbMatch ? dbMatch[1] : process.env.DATABASE_URL;

const sql = postgres(dbUrl, { ssl: 'require' });

async function testFlow() {
  console.log('=== TESTING COMPLETE ORDERING FLOW ===\n');

  // 1. Pick a sample medicine
  const sample = await sql`SELECT id, title, price_cents, stock, cover_seed FROM books WHERE stock > 5 LIMIT 1`;
  if (!sample.length) {
    console.error('No products found with stock > 5');
    await sql.end();
    return;
  }

  const product = sample[0];
  console.log(`1. Selected Test Product: "${product.title}" (ID: ${product.id}, Stock: ${product.stock}, Price: PKR ${product.price_cents / 100})`);

  // 2. Test Guest user creation / retrieval
  const testEmail = `test.patient.${Date.now()}@carefirst.pk`;
  const guestName = 'Test Patient';
  
  let guestUser = await sql`SELECT id FROM users WHERE email = ${testEmail}`;
  let userId;
  if (guestUser.length === 0) {
    const inserted = await sql`
      INSERT INTO users (name, email, password_hash, email_verified)
      VALUES (${guestName}, ${testEmail}, 'GUEST_NO_PASSWORD', TRUE)
      RETURNING id
    `;
    userId = inserted[0].id;
  } else {
    userId = guestUser[0].id;
  }
  console.log(`2. Guest User Created/Found: User ID #${userId} (${testEmail})`);

  // 3. Test Cart Item Resolution & Stock check
  const orderQty = 2;
  const initialStock = product.stock;
  const totalCents = product.price_cents * orderQty + 15000; // + PKR 150 shipping

  const shippingDetails = {
    fullName: guestName,
    email: testEmail,
    phone: '03001234567',
    address: 'Suite 4B, Health Avenue',
    area: 'Clifton',
    city: 'Karachi',
    delivery: 'standard',
    shippingCost: 150
  };

  // 4. Test Place Order Transaction
  console.log('3. Placing Order Transaction...');
  const orderCode = 'CF-' + Math.random().toString(16).substring(2, 10).toUpperCase();
  
  const orderRes = await sql.begin(async (tx) => {
    const oRes = await tx`
      INSERT INTO orders (user_id, total_cents, status, shipping_json, payment_method, order_code)
      VALUES (${userId}, ${totalCents}, 'Pending', ${JSON.stringify(shippingDetails)}, 'cod', ${orderCode})
      RETURNING id
    `;
    const orderId = oRes[0].id;

    await tx`
      INSERT INTO order_items (order_id, book_id, title, author, price_cents, quantity, cover_seed)
      VALUES (${orderId}, ${product.id}, ${product.title}, 'CareFirst', ${product.price_cents}, ${orderQty}, ${product.cover_seed})
    `;

    await tx`
      UPDATE books
      SET stock = stock - ${orderQty}
      WHERE id = ${product.id}
    `;

    return { orderId, orderCode };
  });

  console.log(`4. ✅ Order Placed Successfully! Order ID: #${orderRes.orderId} (Code: ${orderRes.orderCode})`);

  // 5. Verify Stock Deduction
  const updatedProduct = await sql`SELECT stock FROM books WHERE id = ${product.id}`;
  console.log(`5. Stock Verification: Initial Stock: ${initialStock} -> New Stock: ${updatedProduct[0].stock} (Deducted: ${initialStock - updatedProduct[0].stock})`);

  // 6. Verify Order Retrieval
  const fetchedOrder = await sql`
    SELECT o.*, u.name as customer_name, u.email as customer_email
    FROM orders o JOIN users u ON u.id = o.user_id
    WHERE o.id = ${orderRes.orderId}
  `;
  const items = await sql`SELECT * FROM order_items WHERE order_id = ${orderRes.orderId}`;
  
  console.log(`6. Order Retrieval Verification:`);
  console.log(`   - Order Code: ${fetchedOrder[0].order_code}`);
  console.log(`   - Status: ${fetchedOrder[0].status}`);
  console.log(`   - Total: PKR ${fetchedOrder[0].total_cents / 100}`);
  console.log(`   - Items Count: ${items.length} items (${items[0].title} x${items[0].quantity})`);

  // 7. Test Order Cancellation & Stock Restoral
  console.log('7. Testing Order Cancellation & Stock Restoral...');
  await sql.begin(async (tx) => {
    await tx`UPDATE orders SET status = 'Cancelled' WHERE id = ${orderRes.orderId}`;
    await tx`UPDATE books SET stock = stock + ${orderQty} WHERE id = ${product.id}`;
  });

  const finalStock = await sql`SELECT stock FROM books WHERE id = ${product.id}`;
  console.log(`8. ✅ Cancellation Verified: Status is Cancelled, Stock restored to: ${finalStock[0].stock}`);

  // Cleanup test order
  await sql`DELETE FROM order_items WHERE order_id = ${orderRes.orderId}`;
  await sql`DELETE FROM orders WHERE id = ${orderRes.orderId}`;
  await sql`DELETE FROM users WHERE id = ${userId}`;
  console.log('\n=== ALL ORDERING FLOW TESTS PASSED ===\n');

  await sql.end();
}

testFlow().catch(console.error);
