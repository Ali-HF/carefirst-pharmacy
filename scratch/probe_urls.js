const https = require('https');

async function testUrl(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, length: data.length, sample: data.slice(0, 300) }));
    }).on('error', e => resolve({ error: e.message }));
  });
}

async function run() {
  const urls = [
    'https://dawaai.pk/search?q=panadol',
    'https://dvago.pk/search?q=panadol',
    'https://dawaai.pk/api/products?search=panadol',
  ];
  for (const u of urls) {
    const res = await testUrl(u);
    console.log(u, '->', res.status, res.length);
  }
}
run();
