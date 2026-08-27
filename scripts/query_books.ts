import postgres from "postgres";

const sql = postgres("postgres://postgres.pakwgrzjbuvrweeshrit:Ua4ecWCahmyr39bC@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true", { ssl: "require" });

async function run() {
  const books = await sql`SELECT id, title, genre, isbn FROM books ORDER BY id ASC`;
  console.log(JSON.stringify(books, null, 2));
  process.exit(0);
}

run();
