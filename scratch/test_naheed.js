const https = require('https');

function fetchJson(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve({ error: e.message, status: res.statusCode, raw: data.slice(0, 300) });
        }
      });
    }).on('error', e => resolve({ error: e.message }));
  });
}

async function testProducts() {
  const url = 'https://www.naheed.pk/rest/V1/products?searchCriteria[filterGroups][0][filters][0][field]=name&searchCriteria[filterGroups][0][filters][0][value]=%25panadol%25&searchCriteria[filterGroups][0][filters][0][conditionType]=like&searchCriteria[pageSize]=5';
  const res = await fetchJson(url);
  if (res.items && res.items.length > 0) {
    console.log('Total found:', res.items.length);
    res.items.forEach(item => {
      const attrs = {};
      (item.custom_attributes || []).forEach(a => attrs[a.attribute_code] = a.value);
      const img = attrs.image || attrs.small_image || attrs.thumbnail;
      console.log(`Product: ${item.name} (${item.sku})`);
      if (img && img !== 'no_selection') {
        console.log(`  Image: https://www.naheed.pk/media/catalog/product${img}`);
      }
    });
  } else {
    console.log('Result:', res);
  }
}

testProducts();
