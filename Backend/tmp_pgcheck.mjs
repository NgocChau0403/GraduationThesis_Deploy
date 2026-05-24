import dotenv from "dotenv";
dotenv.config({ path: "C:/[Graduation_Thesis]Prototype/Backend/.env" });
console.log('DBURL', process.env.DATABASE_URL);
import pg from "pg";
const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
try {
  await client.connect();
  const r = await client.query('select 1 as ok');
  console.log('PG_OK', r.rows[0]);
} catch(e) {
  console.log('PG_ERR', e.code, e.message);
} finally {
  await client.end().catch(()=>{});
}
