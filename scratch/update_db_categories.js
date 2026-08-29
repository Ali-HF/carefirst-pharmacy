const postgres = require('postgres');
const url = "postgres://postgres.cdpqhxckjptirgzgsmsv:9DjWTh5UfdMgSRdK@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true";

async function run() {
  const sql = postgres(url, { ssl: 'require' });
  try {
    const books = await sql`SELECT id, title, genre FROM books`;
    
    let updatedCount = 0;
    
    for (const book of books) {
      let newGenre = "Medicine";
      const oldGenre = book.genre ? book.genre.toUpperCase() : "";
      
      if (["MULTIVITAMINS", "SUPPLEMENTS"].includes(oldGenre)) {
        newGenre = "Vitamins";
      } else if (["SKIN CARE", "SHAMPOO", "CREAM", "LOTION", "SOAP"].includes(oldGenre)) {
        newGenre = "Personal Care";
      } else if (["SURGICAL", "SYRINGE", "GENERAL ITEM", "DEVICE", "EQUIPMENT"].includes(oldGenre)) {
        newGenre = "Devices";
      } else if (["HERBAL"].includes(oldGenre)) {
        newGenre = "Herbal";
      } else if (["BABY", "MOTHER", "DIAPER"].includes(oldGenre)) {
        newGenre = "Baby & Mother";
      } else {
        newGenre = "Medicine";
      }
      
      await sql`UPDATE books SET genre = ${newGenre} WHERE id = ${book.id}`;
      updatedCount++;
      if (updatedCount % 100 === 0) {
        console.log(`Updated ${updatedCount} products...`);
      }
    }
    
    console.log(`Successfully updated ${updatedCount} products to new categories.`);
  } catch (e) {
    console.error("Error updating categories:", e);
  } finally {
    process.exit(0);
  }
}

run();
