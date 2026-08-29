const postgres = require('postgres');
const fs = require('fs');
const https = require('https');

const env = fs.readFileSync('.env.local', 'utf8');
const dbMatch = env.match(/DATABASE_URL=["']?([^"'\r\n]+)/);
const dbUrl = dbMatch ? dbMatch[1] : process.env.DATABASE_URL;

const sql = postgres(dbUrl, { ssl: 'require' });

// Helper to fetch JSON via HTTPS
function fetchJson(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

// Clean title to search term (remove dosage suffixes like 10MG TAB, CAP, SYP for better match)
function cleanTitle(title) {
  return title
    .replace(/\s+(TAB|CAP|SYP|INJ|DROP|CREAM|OINT|GEL|SACHET|SUSP|SOL|LOTION|MG|GM|ML|NO|PACK)\b/gi, '')
    .trim();
}

async function findPackshot(title) {
  const query = cleanTitle(title);
  // 1. Try public pharmaceutical catalog endpoints
  // Dawaai public search
  try {
    const dawaaiUrl = `https://dawaai.pk/search/products?query=${encodeURIComponent(query)}`;
    // If we query an open index or direct CDN pattern:
  } catch (e) {}

  return null;
}

async function main() {
  console.log('Testing image search pipeline...');
  const sample = await sql`SELECT id, title, genre FROM books WHERE title ILIKE '%panadol%' OR title ILIKE '%risek%' OR title ILIKE '%surbex%' OR title ILIKE '%brufen%' OR title ILIKE '%calpol%' LIMIT 10`;
  console.log('Sample matches:', sample);
  await sql.end();
}

main().catch(console.error);
