const https = require('https');

function fetchHtml(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
    }).on('error', () => resolve(''));
  });
}

async function inspectLines() {
  const html = await fetchHtml('https://dawaai.pk/search?q=panadol');
  const lines = html.split('\n');
  console.log('--- Lines 880 to 910 ---');
  console.log(lines.slice(880, 910).join('\n'));

  console.log('--- Lines 2240 to 2265 ---');
  console.log(lines.slice(2240, 2265).join('\n'));
}

inspectLines();
