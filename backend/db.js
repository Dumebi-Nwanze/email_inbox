import pg from "pg";

const { Pool } = pg;

let poolConfig = {
  user: "postgres",
  password: "postgres123",
  host: "localhost",
  port: "5432",
  database: "emailinbox",
};

const pool = new Pool(poolConfig);

export default pool;
