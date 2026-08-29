const https = require('https');

function getMore(query) {
  return new Promise((resolve) => {
    const url = `https://dawaai.pk/search/getmoreSearchResults/${encodeURIComponent(query)}/1`;
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'X-Requested-With': 'XMLHttpRequest'
      }
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve({ raw: data.slice(0, 500) });
        }
      });
    }).on('error', e => resolve({ error: e.message }));
  });
}

async function test() {
  const res = await getMore('panadol');
  console.log('Keys:', Object.keys(res));
  if (res.all_products && res.all_products.data) {
    console.log('Products found:', res.all_products.data.length);
    console.log('Sample product:', JSON.stringify(res.all_products.data[0], null, 2));
  } else {
    console.log('Res:', res);
  }
}

test();
