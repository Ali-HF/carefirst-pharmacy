const postgres = require('postgres');

const regions = [
  'us-east-1', 'us-west-1', 'us-west-2',
  'eu-west-1', 'eu-west-2', 'eu-central-1',
  'ap-southeast-1', 'ap-northeast-1', 'ap-northeast-2',
  'ap-south-1', 'sa-east-1', 'ca-central-1'
];

async function testRegions() {
  for (const region of regions) {
    const host = `aws-0-${region}.pooler.supabase.com`;
    const url = `postgres://postgres.cdpqhxckjptirgzgsmsv:9DjWTh5UfdMgSRdK@${host}:6543/postgres?pgbouncer=true`;
    console.log(`Testing ${host}...`);
    try {
      const sql = postgres(url, { ssl: 'require', connect_timeout: 5 });
      await sql`SELECT 1`;
      console.log(`SUCCESS: ${url}`);
      process.exit(0);
    } catch (e) {
      console.log(`Failed for ${region}:`, e.message);
    }
  }
  console.log('All failed.');
}

testRegions();
