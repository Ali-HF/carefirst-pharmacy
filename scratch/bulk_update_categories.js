const postgres = require('postgres');
const url = "postgres://postgres.cdpqhxckjptirgzgsmsv:9DjWTh5UfdMgSRdK@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true";

async function run() {
  const sql = postgres(url, { ssl: 'require' });
  try {
    await sql`
      UPDATE books 
      SET genre = CASE 
        WHEN UPPER(genre) IN ('MULTIVITAMINS', 'SUPPLEMENTS') THEN 'Vitamins'
        WHEN UPPER(genre) IN ('SKIN CARE', 'SHAMPOO', 'CREAM', 'LOTION', 'SOAP') THEN 'Personal Care'
        WHEN UPPER(genre) IN ('SURGICAL', 'SYRINGE', 'GENERAL ITEM', 'DEVICE', 'EQUIPMENT') THEN 'Devices'
        WHEN UPPER(genre) IN ('HERBAL') THEN 'Herbal'
        WHEN UPPER(genre) IN ('BABY', 'MOTHER', 'DIAPER') THEN 'Baby & Mother'
        ELSE 'Medicine'
      END
    `;
    console.log("Successfully ran bulk update.");
  } catch (e) {
    console.error("Error bulk updating categories:", e);
  } finally {
    process.exit(0);
  }
}

run();
