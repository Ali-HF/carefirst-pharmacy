const https = require('https');

function testWikipedia(title) {
  return new Promise((resolve) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(title)}&gsrlimit=1&prop=pageimages&pithumbsize=600&format=json`;
    https.get(url, { headers: { 'User-Agent': 'CarefirstBot/1.0 (care@carefirst.pk)' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query ? json.query.pages : {};
          const firstPage = Object.values(pages)[0];
          if (firstPage && firstPage.thumbnail) {
            resolve(firstPage.thumbnail.source);
          } else {
            resolve(null);
          }
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

async function run() {
  const medicines = ['Paracetamol', 'Ibuprofen', 'Omeprazole', 'Amoxicillin', 'Aspirin', 'Vitamin C', 'Cetirizine'];
  for (const m of medicines) {
    const img = await testWikipedia(m);
    console.log(m, '->', img);
  }
}

run();
