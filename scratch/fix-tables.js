const postgres = require('postgres');
const sql = postgres('postgres://postgres.cdpqhxckjptirgzgsmsv:9DjWTh5UfdMgSRdK@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true', {ssl: 'require'});

async function run() {
  try {
    // Check if old tables have UUID ids (indicating they are the conflicting ones)
    const res = await sql`SELECT column_name, data_type FROM information_schema.columns WHERE table_schema='public' AND table_name='orders' AND column_name='id'`;
    if (res[0] && res[0].data_type === 'uuid') {
      console.log('Renaming old tables...');
      await sql`ALTER TABLE cart_items RENAME TO old_cart_items`;
      await sql`ALTER TABLE order_items RENAME TO old_order_items`;
      await sql`ALTER TABLE orders RENAME TO old_orders`;
      
      console.log('Creating new tables...');
      await sql`
        CREATE TABLE cart_items (
          id SERIAL PRIMARY KEY,
          user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          book_id INTEGER NOT NULL REFERENCES books(id) ON DELETE CASCADE,
          quantity INTEGER NOT NULL DEFAULT 1,
          color TEXT NOT NULL DEFAULT '',
          UNIQUE (user_id, book_id, color)
        )
      `;
      
      await sql`
        CREATE TABLE orders (
          id SERIAL PRIMARY KEY,
          order_code TEXT UNIQUE,
          user_id INTEGER NOT NULL REFERENCES users(id),
          total_cents INTEGER NOT NULL DEFAULT 0,
          status TEXT NOT NULL DEFAULT 'Pending',
          shipping_json TEXT,
          payment_method TEXT DEFAULT 'cod',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
      
      await sql`
        CREATE TABLE order_items (
          id SERIAL PRIMARY KEY,
          order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
          book_id INTEGER REFERENCES books(id) ON DELETE SET NULL,
          title TEXT NOT NULL,
          author TEXT NOT NULL DEFAULT '',
          price_cents INTEGER NOT NULL,
          quantity INTEGER NOT NULL DEFAULT 1,
          cover_seed TEXT DEFAULT '',
          color TEXT
        )
      `;
      console.log('Done creating new tables.');
    } else {
      console.log('Tables are already using SERIAL PRIMARY KEY or do not exist.');
    }
  } catch (e) {
    console.error(e);
  } finally {
    process.exit(0);
  }
}

run();
