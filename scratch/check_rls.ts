import * as db from '../src/lib/db';

async function checkRls() {
  const result = await db.sql`
    SELECT relname AS table_name, relrowsecurity AS rls_enabled
    FROM pg_class
    JOIN pg_namespace ON pg_class.relnamespace = pg_namespace.oid
    WHERE pg_namespace.nspname = 'public' AND pg_class.relkind = 'r'
    ORDER BY table_name;
  `;
  
  console.table(result);
  process.exit(0);
}

checkRls().catch(e => {
  console.error(e);
  process.exit(1);
});
