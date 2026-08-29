const https = require('https');

function fetchUrl(targetUrl) {
  return new Promise((resolve) => {
    https.get(targetUrl, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const nextUrl = res.headers.location.startsWith('http')
          ? res.headers.location
          : new URL(res.headers.location, targetUrl).toString();
        return resolve(fetchUrl(nextUrl));
      }
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    }).on('error', e => resolve({ error: e.message }));
  });
}

async function run() {
  const res = await fetchUrl('https://dvago.pk/p/panadol-500mg-tablet-200s');
  console.log('Status:', res.status);
  if (res.body) {
    // Look for __NEXT_DATA__ or product image in html
    const nextDataMatch = res.body.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
    if (nextDataMatch) {
      try {
        const json = JSON.parse(nextDataMatch[1]);
        console.log('NEXT DATA Keys:', Object.keys(json.props.pageProps));
        console.log('Product Data:', JSON.stringify(json.props.pageProps, null, 2).slice(0, 1500));
      } catch (e) {
        console.log('JSON parse error:', e.message);
      }
    } else {
      const imgMatches = [...res.body.matchAll(/https:\/\/[^"'\s]+\.(?:jpg|png|webp)/gi)];
      console.log('Image URLs found:', imgMatches.length);
      imgMatches.slice(0, 5).forEach(m => console.log('IMG:', m[0]));
    }
  }
}

run();
