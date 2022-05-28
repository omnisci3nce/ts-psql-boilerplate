import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  database: 'postgres',
  password: 'docker',
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
