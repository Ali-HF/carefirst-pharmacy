const https = require('https');

function queryES(term) {
  return new Promise((resolve) => {
    const url = `https://dawaai.pk/elasticsearch/curlES.php?q=${encodeURIComponent(term)}&p=0&s=5`;
    const req = https.request(url, {
      method: 'POST',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Content-Type': 'application/json',
      }
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve({ raw: data.slice(0, 300) });
        }
      });
    });
    req.on('error', e => resolve({ error: e.message }));
    req.end();
  });
}

async function test() {
  const res = await queryES('panadol');
  console.log('ES Result:', JSON.stringify(res, null, 2).slice(0, 1000));
}

test();
