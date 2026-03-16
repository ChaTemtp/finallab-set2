const express = require('express');
const { pool } = require('../db/db');
const requireAuth = require('../middleware/authMiddleware');

const router = express.Router();

<<<<<<< HEAD
router.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'user-service' });
});

router.use(requireAuth);

async function ensureProfile(user) {
=======
async function findOrCreateProfile(user) {
>>>>>>> 3b08dcd8df74ba294549f8716d67106621ddf38c
  const existing = await pool.query(
    'SELECT * FROM user_profiles WHERE user_id = $1',
    [user.sub]
  );

<<<<<<< HEAD
  if (existing.rowCount > 0) {
=======
  if (existing.rows[0]) {
>>>>>>> 3b08dcd8df74ba294549f8716d67106621ddf38c
    return existing.rows[0];
  }

  const created = await pool.query(
    `INSERT INTO user_profiles
      (user_id, username, email, role, display_name, bio, avatar_url, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
     RETURNING *`,
<<<<<<< HEAD
    [
      user.sub,
      user.username,
      user.email,
      user.role,
      user.username,
      '',
      ''
    ]
=======
    [user.sub, user.username, user.email, user.role, user.username, '', '']
>>>>>>> 3b08dcd8df74ba294549f8716d67106621ddf38c
  );

  return created.rows[0];
}

<<<<<<< HEAD
// GET /api/users/me
router.get('/me', async (req, res) => {
  try {
    const profile = await ensureProfile(req.user);
    res.json({ profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/users/me
router.put('/me', async (req, res) => {
  const { display_name, bio, avatar_url } = req.body;

  try {
    await ensureProfile(req.user);

    const result = await pool.query(
      `UPDATE user_profiles
       SET display_name = COALESCE($1, display_name),
           bio = COALESCE($2, bio),
           avatar_url = COALESCE($3, avatar_url),
           username = $4,
           email = $5,
           role = $6,
           updated_at = NOW()
       WHERE user_id = $7
       RETURNING *`,
      [
        display_name,
        bio,
        avatar_url,
        req.user.username,
        req.user.email,
        req.user.role,
=======
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
>>>>>>> 3b08dcd8df74ba294549f8716d67106621ddf38c
        req.user.sub
      ]
    );

    res.json({ profile: result.rows[0] });
  } catch (err) {
    console.error(err);
<<<<<<< HEAD
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/users  admin only
router.get('/', async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM user_profiles ORDER BY user_id ASC'
    );

    res.json({
      users: result.rows,
      count: result.rowCount
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
=======
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
>>>>>>> 3b08dcd8df74ba294549f8716d67106621ddf38c
  }
});

module.exports = router;