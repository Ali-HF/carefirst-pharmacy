const https = require('https');

async function testFetch(url, headers = {}) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', ...headers } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ status: res.statusCode, headers: res.headers, body: data.slice(0, 500) });
      });
    }).on('error', (err) => resolve({ error: err.message }));
  });
}

async function run() {
  console.log('Testing APIs:');
  const r1 = await testFetch('https://dawaai.pk/search/products?query=panadol');
  console.log('Dawaai search:', r1.status, r1.body.slice(0, 200));

  const r2 = await testFetch('https://api.dvago.pk/products/search?name=panadol');
  console.log('Dvago API search:', r2.status, r2.body.slice(0, 200));
}

run();
