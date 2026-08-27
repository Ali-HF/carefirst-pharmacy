require('dotenv').config({path: '.env.local'});
const postgres = require('postgres');
const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

async function run() {
  try {
    const res = await sql`SELECT conname, pg_get_constraintdef(oid) FROM pg_constraint WHERE conrelid = 'books'::regclass`;
    console.log(res);
  } catch (e) {
    console.error(e);
  } finally {
    await sql.end();
  }
}
run();
