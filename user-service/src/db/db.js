const { Pool } = require('pg');
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