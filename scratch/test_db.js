const postgres = require('postgres');
const bcrypt = require('bcryptjs');
const sql = postgres('postgresql://postgres:9DjWTh5UfdMgSRdK@db.cdpqhxckjptirgzgsmsv.supabase.co:5432/postgres', {ssl:'require'});

async function main() {
  try {
    // 1. Verify migration
    const bookCount = await sql`SELECT COUNT(*)::int as c FROM books`;
    console.log('Books table count:', bookCount[0].c);

    const sample = await sql`SELECT id, title, author, genre, price_cents, stock, cover_seed FROM books LIMIT 3`;
    console.log('\nSample products:');
    sample.forEach(b => console.log(`  #${b.id}: ${b.title} | ${b.genre} | ${b.price_cents} cents | stock: ${b.stock}`));

    // 2. Check unique genres
    const genres = await sql`SELECT DISTINCT genre, COUNT(*)::int as c FROM books GROUP BY genre ORDER BY c DESC`;
    console.log('\nCategories (genres):');
    genres.forEach(g => console.log(`  ${g.genre}: ${g.c} products`));

    // 3. Create admin account
    const adminEmail = 'admin@carefirst.pk';
    const adminExists = await sql`SELECT id FROM users WHERE email = ${adminEmail}`;
    if (adminExists.length === 0) {
      const hash = bcrypt.hashSync('Carefirst2026!', 10);
      await sql`
        INSERT INTO users (name, email, password_hash, is_admin, email_verified)
        VALUES ('Carefirst Admin', ${adminEmail}, ${hash}, 1, TRUE)
      `;
      console.log('\n✅ Admin account created!');
      console.log('   Email: admin@carefirst.pk');
      console.log('   Password: Carefirst2026!');
    } else {
      console.log('\n✅ Admin account already exists.');
    }

  } catch(e) {
    console.error('Error:', e.message);
  }
  await sql.end();
}
main();
