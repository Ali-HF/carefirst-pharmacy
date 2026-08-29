const postgres = require('postgres');
const fs = require('fs');

const env = fs.readFileSync('.env.local', 'utf8');
const dbMatch = env.match(/DATABASE_URL=["']?([^"'\r\n]+)/);
const dbUrl = dbMatch ? dbMatch[1] : process.env.DATABASE_URL;

const sql = postgres(dbUrl, { ssl: 'require' });

async function check() {
  const count = await sql`SELECT count(*) FROM books`;
  const sample = await sql`SELECT id, title, author, genre, cover_seed FROM books LIMIT 15`;
  const withImages = await sql`SELECT count(*) FROM books WHERE cover_seed LIKE 'http%'`;
  console.log('Total products:', count[0].count);
  console.log('Products with image URLs:', withImages[0].count);
  console.log('Sample products:');
  sample.forEach(s => console.log(`[${s.id}] [${s.genre}] ${s.title} (by ${s.author}) -> cover: ${s.cover_seed}`));
  await sql.end();
}

check().catch(console.error);
