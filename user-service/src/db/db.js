const { Pool } = require('pg');
<<<<<<< HEAD

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('[user-service] Connected to PostgreSQL');
});

pool.on('error', (err) => {
  console.error('[user-service] Postgres error:', err);
});

module.exports = { pool };
=======
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function initDB() {
  const client = await pool.connect();
  try {
    const sqlPath = path.join(__dirname, '../../init.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    await client.query(sql);
    console.log('[user-service] schema initialized');
  } finally {
    client.release();
  }
}

module.exports = { pool, initDB };
>>>>>>> 3b08dcd8df74ba294549f8716d67106621ddf38c
