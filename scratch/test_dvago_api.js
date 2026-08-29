const https = require('https');

async function testDvagoProduct(slug) {
  return new Promise((resolve) => {
    const url = `https://api.dvago.pk/products/detail?slug=${slug}`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve({ status: res.statusCode, raw: data.slice(0, 200) });
        }
      });
    }).on('error', e => resolve({ error: e.message }));
  });
}

async function run() {
  const slugs = ['panadol-500mg-tablet-200s', 'risek-20mg-capsule-14s', 'brufen-400mg-tablet-30s', 'surbex-z-tablet-30s'];
  for (const s of slugs) {
    const res = await testDvagoProduct(s);
    console.log(s, '->', res);
  }
}

run();
