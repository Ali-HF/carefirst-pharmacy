const postgres = require('postgres');

const url = "postgres://postgres.cdpqhxckjptirgzgsmsv:9DjWTh5UfdMgSRdK@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true";

async function run() {
  const sql = postgres(url, { ssl: 'require' });
  try {
    const books = await sql`SELECT id, title, genre FROM books`;
    console.log(JSON.stringify(books, null, 2));
  } catch (e) {
    console.error(e);
  } finally {
    process.exit(0);
  }
}

run();
