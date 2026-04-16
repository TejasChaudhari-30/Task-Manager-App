import pg from "pg";
import dotenv from "dotenv"

dotenv.config();

const db=new pg.Client({
      connectionString:process.env.DataBase_URL,
      ssl:{
        rejectUnauthorized:false,
      }
  //     user:"postgres",
  // host:"localhost",
  // database:"Fullstack",
  // password:process.env.data_pass,
  // port:5432
});
await db.connect();

export default db;