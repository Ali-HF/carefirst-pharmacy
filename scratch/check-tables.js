const postgres = require('postgres');
const sql = postgres('postgres://postgres.cdpqhxckjptirgzgsmsv:9DjWTh5UfdMgSRdK@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true', {ssl: 'require'});
sql`SELECT table_name FROM information_schema.tables WHERE table_schema='public'`.then(res => { console.log(res); process.exit(0); }).catch(e => console.error(e));
