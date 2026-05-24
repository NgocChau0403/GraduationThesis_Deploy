import dotenv from "dotenv";
dotenv.config({ path: new URL("./.env", import.meta.url).pathname });
console.log(JSON.stringify(process.env.DATABASE_URL));
