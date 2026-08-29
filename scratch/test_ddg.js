const https = require('https');

async function searchDuckDuckGoImages(query) {
  return new Promise((resolve) => {
    // 1. Get token
    const tokenUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}&iax=images&ia=images`;
    https.get(tokenUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      }
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        const vqdMatch = data.match(/vqd=['"]?([^&"'\r\n]+)/) || data.match(/vqd=([0-9\-]+)/);
        if (!vqdMatch) {
          return resolve({ error: 'No VQD token found' });
        }
        const vqd = vqdMatch[1];
        
        // 2. Query JSON
        const searchUrl = `https://duckduckgo.com/i.js?l=us-en&o=json&q=${encodeURIComponent(query)}&vqd=${vqd}&f=,,,&p=1`;
        https.get(searchUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
            'Referer': 'https://duckduckgo.com/',
          }
        }, (res2) => {
          let data2 = '';
          res2.on('data', c => data2 += c);
          res2.on('end', () => {
            try {
              const json = JSON.parse(data2);
              resolve(json.results || []);
            } catch (e) {
              resolve({ error: e.message, raw: data2.slice(0, 200) });
            }
          });
        }).on('error', e => resolve({ error: e.message }));
      });
    }).on('error', e => resolve({ error: e.message }));
  });
}

async function test() {
  console.log('Testing DuckDuckGo Image Search for Panadol:');
  const results = await searchDuckDuckGoImages('Panadol 500mg tablet packshot');
  if (Array.isArray(results)) {
    console.log('Found results:', results.length);
    results.slice(0, 3).forEach((r, i) => {
      console.log(`[${i+1}] Title: ${r.title}\n    Image: ${r.image}\n    Thumbnail: ${r.thumbnail}`);
    });
  } else {
    console.log('Result:', results);
  }
}

test();
