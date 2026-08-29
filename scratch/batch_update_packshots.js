const postgres = require('postgres');
const fs = require('fs');
const https = require('https');
const http = require('http');

const env = fs.readFileSync('.env.local', 'utf8');
const dbMatch = env.match(/DATABASE_URL=["']?([^"'\r\n]+)/);
const dbUrl = dbMatch ? dbMatch[1] : process.env.DATABASE_URL;

const sql = postgres(dbUrl, { ssl: 'require' });

// Function to search Bing Images for authentic product packshots
function searchPackshot(query) {
  return new Promise((resolve) => {
    // Add "packshot" and manufacturer context for clean studio photos
    const searchQuery = `${query} pharmaceutical packshot box`;
    const url = `https://www.bing.com/images/search?q=${encodeURIComponent(searchQuery)}&form=HDRSC2&first=1`;
    
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        const murls = [...data.matchAll(/murl&quot;:&quot;(https?:[^&]+?)&quot;/gi)].map(m => m[1]);
        const cleanUrls = murls.filter(u => 
          !u.includes('lookaside.fbsbx.com') && 
          !u.includes('gstatic.com') &&
          !u.includes('bing.net') &&
          (u.endsWith('.jpg') || u.endsWith('.jpeg') || u.endsWith('.png') || u.endsWith('.webp') || u.includes('?'))
        );
        resolve(cleanUrls[0] || null);
      });
    });

    req.on('error', () => resolve(null));
    req.setTimeout(8000, () => {
      req.destroy();
      resolve(null);
    });
  });
}

function cleanTitle(title) {
  return title
    .replace(/\(.*?\)/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

async function runBatch() {
  console.log('=== Carefirst Automated Packshot Importer ===');
  
  // Select products that need images (empty, placeholder, or not http)
  const products = await sql`
    SELECT id, title, genre, cover_seed 
    FROM books 
    WHERE cover_seed IS NULL 
       OR cover_seed = '' 
       OR cover_seed LIKE '/assets/%'
       OR cover_seed NOT LIKE 'http%'
    ORDER BY id ASC
  `;

  console.log(`Found ${products.length} products needing packshot images.`);
  
  let updatedCount = 0;
  let skippedCount = 0;

  // Process in batches with small delays
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const cleanName = cleanTitle(product.title);
    
    try {
      const imageUrl = await searchPackshot(cleanName);
      
      if (imageUrl) {
        await sql`
          UPDATE books 
          SET cover_seed = ${imageUrl} 
          WHERE id = ${product.id}
        `;
        updatedCount++;
        console.log(`[${i + 1}/${products.length}] ✅ Updated: "${product.title}" -> ${imageUrl.slice(0, 70)}...`);
      } else {
        skippedCount++;
        console.log(`[${i + 1}/${products.length}] ⚠️ No image found for: "${product.title}"`);
      }
    } catch (err) {
      console.error(`[${i + 1}/${products.length}] ❌ Error on "${product.title}":`, err.message);
    }

    // Rate limiting delay (250ms per item) to be polite and avoid blocks
    await new Promise(r => setTimeout(r, 250));

    // Periodic summary every 50 products
    if ((i + 1) % 50 === 0) {
      console.log(`\n--- Progress: ${i + 1}/${products.length} processed (${updatedCount} updated, ${skippedCount} skipped) ---\n`);
    }
  }

  console.log('\n=== Batch Sourcing Completed ===');
  console.log(`Total Products Processed: ${products.length}`);
  console.log(`Total Images Updated: ${updatedCount}`);
  console.log(`Skipped / Maintained SVG fallback: ${skippedCount}`);

  await sql.end();
}

runBatch().catch(console.error);
