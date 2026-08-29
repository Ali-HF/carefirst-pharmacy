const postgres = require('postgres');
const fs = require('fs');

const env = fs.readFileSync('.env.local', 'utf8');
const dbMatch = env.match(/DATABASE_URL=["']?([^"'\r\n]+)/);
const dbUrl = dbMatch ? dbMatch[1] : process.env.DATABASE_URL;

const sql = postgres(dbUrl, { ssl: 'require', prepare: false });

async function createIndexes() {
  console.log('Creating database performance indexes...');
  try {
    await sql`CREATE INDEX IF NOT EXISTS idx_books_genre ON books (genre)`;
    console.log('1. idx_books_genre OK');
    await sql`CREATE INDEX IF NOT EXISTS idx_books_created_at ON books (created_at DESC)`;
    console.log('2. idx_books_created_at OK');
    await sql`CREATE INDEX IF NOT EXISTS idx_books_price ON books (price_cents)`;
    console.log('3. idx_books_price OK');
    await sql`CREATE INDEX IF NOT EXISTS idx_order_items_book_id ON order_items (book_id)`;
    console.log('4. idx_order_items_book_id OK');
    await sql`CREATE INDEX IF NOT EXISTS idx_reviews_book_id ON reviews (book_id)`;
    console.log('5. idx_reviews_book_id OK');
    await sql`CREATE INDEX IF NOT EXISTS idx_cart_items_user_id ON cart_items (user_id)`;
    console.log('6. idx_cart_items_user_id OK');
    console.log('\n✓ All database performance indexes are active!');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await sql.end();
  }
}

createIndexes();
