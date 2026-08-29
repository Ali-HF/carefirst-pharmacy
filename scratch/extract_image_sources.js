const postgres = require('postgres');
const fs = require('fs');

const env = fs.readFileSync('.env.local', 'utf8');
const dbMatch = env.match(/DATABASE_URL=["']?([^"'\r\n]+)/);
const dbUrl = dbMatch ? dbMatch[1] : process.env.DATABASE_URL;

const sql = postgres(dbUrl, { ssl: 'require' });

async function getSources() {
  const books = await sql`SELECT id, title, cover_seed FROM books WHERE cover_seed IS NOT NULL AND cover_seed != ''`;
  
  const domainCounts = {};
  const domainSamples = {};

  books.forEach(b => {
    try {
      if (b.cover_seed.startsWith('http')) {
        const url = new URL(b.cover_seed);
        const domain = url.hostname;
        domainCounts[domain] = (domainCounts[domain] || 0) + 1;
        if (!domainSamples[domain]) domainSamples[domain] = [];
        if (domainSamples[domain].length < 2) {
          domainSamples[domain].push({ title: b.title, url: b.cover_seed });
        }
      }
    } catch (e) {}
  });

  const sortedDomains = Object.entries(domainCounts).sort((a, b) => b[1] - a[1]);

  console.log(`Total image URLs analyzed: ${books.length}`);
  console.log(`Total unique domains: ${sortedDomains.length}`);

  let md = `# Product Image Sources Reference\n\n`;
  md += `This document lists all the origin domains and sources from which the product packshots were sourced across the Carefirst Pharmacy catalog (~1,650 items).\n\n`;
  md += `## Sourcing Summary\n\n`;
  md += `- **Total Products Analyzed**: ${books.length}\n`;
  md += `- **Unique Sourcing Domains**: ${sortedDomains.length}\n\n`;
  md += `## Domain Breakdown\n\n`;
  md += `| Domain | Type / Category | Images Count | Sample Products |\n`;
  md += `| :--- | :--- | :--- | :--- |\n`;

  sortedDomains.forEach(([domain, count]) => {
    let type = "Pharma Retail / Distributor CDN";
    if (domain.includes('nutrifactor') || domain.includes('getzpharma') || domain.includes('bosch') || domain.includes('cell-laboratories') || domain.includes('telfast')) {
      type = "Official Manufacturer Site";
    } else if (domain.includes('naheed') || domain.includes('dawaai') || domain.includes('sehat') || domain.includes('dwatson') || domain.includes('multanplus')) {
      type = "Verified Medical Catalog / Pharmacy CDN";
    } else if (domain.includes('shopify') || domain.includes('cloudfront') || domain.includes('s3.amazonaws')) {
      type = "Cloud Media / Packaging CDN";
    }

    const samples = (domainSamples[domain] || []).map(s => `"${s.title}"`).join(', ');
    md += `| \`${domain}\` | ${type} | **${count}** | ${samples} |\n`;
  });

  fs.writeFileSync('IMAGE_SOURCES.md', md, 'utf8');
  console.log('Saved to IMAGE_SOURCES.md');
  await sql.end();
}

getSources().catch(console.error);
