import pg from "pg";
import dotenv from "dotenv"

dotenv.config();

const db=new pg.Client({
      user:"postgres",
  host:"localhost",
  database:"Fullstack",
  password:process.env.data_pass,
  port:5432
});
export default db;