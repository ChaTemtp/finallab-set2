const express = require('express');
const { pool } = require('../db/db');
const requireAuth = require('../middleware/authMiddleware');

const router = express.Router();

async function findOrCreateProfile(user) {
  const existing = await pool.query(
    'SELECT * FROM user_profiles WHERE user_id = $1',
    [user.sub]
  );

  if (existing.rows[0]) {
    return existing.rows[0];
  }

  const created = await pool.query(
    `INSERT INTO user_profiles
      (user_id, username, email, role, display_name, bio, avatar_url, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
     RETURNING *`,
    [user.sub, user.username, user.email, user.role, user.username, '', '']
  );

  return created.rows[0];
}

router.get('/health', (_, res) => {
  res.json({ ok: true, service: 'user-service' });
});

router.use(requireAuth);

router.get('/me', async (req, res) => {
  try {
    const profile = await findOrCreateProfile(req.user);
    res.json({ profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'server error' });
  }
});

router.put('/me', async (req, res) => {
  try {
    const current = await findOrCreateProfile(req.user);
    const { display_name, bio, avatar_url } = req.body;

    const result = await pool.query(
      `UPDATE user_profiles
       SET display_name = $1,
           bio = $2,
           avatar_url = $3,
           updated_at = NOW()
       WHERE user_id = $4
       RETURNING *`,
      [
        display_name ?? current.display_name,
        bio ?? current.bio,
        avatar_url ?? current.avatar_url,
        req.user.sub
      ]
    );

    res.json({ profile: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'forbidden' });
    }

    const result = await pool.query(
      `SELECT id, user_id, username, email, role, display_name, bio, avatar_url, updated_at
       FROM user_profiles
       ORDER BY id ASC`
    );

    res.json({ users: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'server error' });
  }
});

module.exports = router;