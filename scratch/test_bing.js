const https = require('https');

function searchBingImages(query) {
  return new Promise((resolve) => {
    const url = `https://www.bing.com/images/search?q=${encodeURIComponent(query + ' product packshot')}&form=HDRSC2&first=1`;
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        // Extract murl from image cards
        const murls = [...data.matchAll(/murl&quot;:&quot;(https?:[^&]+?)&quot;/gi)].map(m => m[1]);
        const cleanUrls = murls.filter(u => !u.includes('lookaside.fbsbx.com') && !u.includes('gstatic.com'));
        resolve(cleanUrls);
      });
    }).on('error', e => resolve([]));
  });
}

async function test() {
  const medicines = [
    'Panadol 500mg tablet',
    'Brufen 400mg tablet',
    'Risek 20mg capsule',
    'Surbex Z tablet',
    'Calpol 120mg syrup',
    'Augmentin 625mg tablet',
    'Disprin 300mg tablet',
    'CAC 1000 Plus sachet'
  ];

  console.log('Testing Bing Images Packshot Engine:');
  for (const m of medicines) {
    const images = await searchBingImages(m);
    console.log(`\nProduct: ${m}`);
    console.log(`Found: ${images.length} images`);
    if (images.length > 0) {
      console.log(`-> Top Packshot: ${images[0]}`);
    }
  }
}

test();
