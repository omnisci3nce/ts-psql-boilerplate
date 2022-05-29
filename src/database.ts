import { Pool } from 'pg';
import 'dotenv/config'

const pool = new Pool({
  host: process.env.POSTGRES_HOST || 'localhost',
  user: process.env.POSTGRES_USER || 'postgres',
  database: process.env.POSTGRES_DB || 'postgres',
  password: process.env.POSTGRES_PWD || 'docker',
  port: Number(process.env.DB_PORT || '5432')
});

const connectToDb = async () => {
  try {
    return pool.connect();
  } catch (err) {
    console.error(err);
  }
};

const connect = connectToDb;

export { connect }
