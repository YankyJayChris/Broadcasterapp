import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});


db.on('connect', () => {
  console.log('connected to the db');
});


// eslint-disable-next-line arrow-body-style
const query = (text, params) => {
  return new Promise((resolve, reject) => {
    db.query(text, params)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default { query, db };
