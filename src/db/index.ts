import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || '',
});

export async function getClient() {
  return pool.connect();
}
