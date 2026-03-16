<<<<<<< HEAD
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('[auth-service] Connected to PostgreSQL');
});

pool.on('error', (err) => {
  console.error('[auth-service] Postgres error:', err);
});

=======
<<<<<<< HEAD
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'postgres',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

pool.on('connect', () => {
  console.log('Connected to PostgreSQL');
});

pool.on('error', (err) => {
  console.error('Postgres connection error:', err);
});

=======
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'postgres',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

pool.on('connect', () => {
  console.log('Connected to PostgreSQL');
});

pool.on('error', (err) => {
  console.error('Postgres connection error:', err);
});

>>>>>>> 57e685cc62836a15e96b86bab455df6805f8ccd6
>>>>>>> 3b08dcd8df74ba294549f8716d67106621ddf38c
module.exports = { pool };