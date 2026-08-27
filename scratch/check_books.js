require('dotenv').config({path: '.env.local'});
const postgres = require('postgres');
const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

async function run() {
  try {
    const books = await sql`SELECT id, title, genre, stock FROM books ORDER BY id DESC LIMIT 5`;
    console.log(books);
  } catch (e) {
    console.error(e);
  } finally {
    await sql.end();
  }
}
run();
