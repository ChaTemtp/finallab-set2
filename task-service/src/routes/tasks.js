const express = require('express');
const { pool } = require('../db/db');
const requireAuth = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/health', (_, res) => {
  res.json({ ok: true, service: 'task-service' });
});

router.use(requireAuth);

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM tasks
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [req.user.sub]
    );
    res.json({ tasks: result.rows, count: result.rowCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'server error' });
  }
});

router.post('/', async (req, res) => {
  const { title, description, status = 'TODO', priority = 'medium' } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'title is required' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO tasks (user_id, title, description, status, priority)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [req.user.sub, title, description || null, status, priority]
    );

    res.status(201).json({ task: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'server error' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, status, priority } = req.body;

  try {
    const check = await pool.query(
      'SELECT * FROM tasks WHERE id = $1 AND user_id = $2',
      [id, req.user.sub]
    );

    if (!check.rows[0]) {
      return res.status(404).json({ message: 'task not found' });
    }

    const current = check.rows[0];

    const result = await pool.query(
      `UPDATE tasks
       SET title = $1,
           description = $2,
           status = $3,
           priority = $4,
           updated_at = NOW()
       WHERE id = $5 AND user_id = $6
       RETURNING *`,
      [
        title ?? current.title,
        description ?? current.description,
        status ?? current.status,
        priority ?? current.priority,
        id,
        req.user.sub
      ]
    );

    res.json({ task: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'server error' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, req.user.sub]
    );

    if (!result.rows[0]) {
      return res.status(404).json({ message: 'task not found' });
    }

    res.json({ message: 'task deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'server error' });
  }
});

module.exports = router;