<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3b08dcd8df74ba294549f8716d67106621ddf38c
const express = require('express');
const bcrypt = require('bcryptjs');
const { pool } = require('../db/db');
const { generateToken, verifyToken } = require('../middleware/jwtUtils');

const router = express.Router();

<<<<<<< HEAD
// health
router.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'auth-service' });
});

// register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'username, email, password are required' });
  }

  try {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedUsername = username.trim();

    const existing = await pool.query(
      'SELECT id FROM users WHERE email = $1 OR username = $2',
      [normalizedEmail, normalizedUsername]
    );

    if (existing.rowCount > 0) {
      return res.status(409).json({ error: 'Email or username already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (username, email, password_hash, role)
       VALUES ($1, $2, $3, 'member')
       RETURNING id, username, email, role, created_at`,
      [normalizedUsername, normalizedEmail, passwordHash]
    );

    return res.status(201).json({
      message: 'Register success',
      user: result.rows[0]
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' });
  }

  try {
    const normalizedEmail = email.trim().toLowerCase();

    const result = await pool.query(
      'SELECT id, username, email, password_hash, role FROM users WHERE email = $1',
      [normalizedEmail]
    );

    const user = result.rows[0];
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    await pool.query('UPDATE users SET last_login = NOW() WHERE id = $1', [user.id]);

    const token = generateToken({
      sub: user.id,
      email: user.email,
      username: user.username,
      role: user.role
    });

    return res.json({
      message: 'Login success',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// me
router.get('/me', async (req, res) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = verifyToken(token);

    const result = await pool.query(
      'SELECT id, username, email, role, created_at, last_login FROM users WHERE id = $1',
      [decoded.sub]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ user: result.rows[0] });
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
});

=======
const DUMMY_BCRYPT_HASH =
'$2b$10$CwTycUXWue0Thq9StjUM0uJ8y0R6VQwWi4KFOeFHrgb3R04QLbL7a';

async function logEvent(data) {
  try {
    await fetch('http://log-service:3003/api/logs/internal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  } catch (_) {}
}


// LOGIN
router.post('/login', async (req, res) => {

  const { email, password } = req.body;
  const ip = req.headers['x-real-ip'] || req.ip;

  if (!email || !password) {
    return res.status(400).json({
      error: 'กรุณากรอก email และ password'
    });
  }

  const normalizedEmail = email.trim().toLowerCase();

  try {

    const result = await pool.query(
      'SELECT id, username, email, password_hash, role FROM users WHERE email=$1',
      [normalizedEmail]
    );

    const user = result.rows[0] || null;

    const passwordHash = user ? user.password_hash : DUMMY_BCRYPT_HASH;

    const isValid = await bcrypt.compare(password, passwordHash);

    if (!user || !isValid) {

      await logEvent({
        service:'auth-service',
        level:'WARN',
        event:'LOGIN_FAILED',
        ip_address:ip,
        message:`Login failed for ${normalizedEmail}`
      });

      return res.status(401).json({
        error:'Email หรือ Password ไม่ถูกต้อง'
      });
    }

    const token = generateToken({
      sub:user.id,
      email:user.email,
      role:user.role,
      username:user.username
    });

    res.json({
      message:'Login สำเร็จ',
      token,
      user:{
        id:user.id,
        username:user.username,
        email:user.email,
        role:user.role
      }
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error:'Server error'
    });

  }
});


// VERIFY
router.get('/verify',(req,res)=>{

  const token=(req.headers['authorization']||'').split(' ')[1];

  if(!token){
    return res.status(401).json({
      valid:false
    });
  }

  try{

    const decoded=verifyToken(token);

    res.json({
      valid:true,
      user:decoded
    });

  }catch(err){

    res.status(401).json({
      valid:false
    });

  }

});


// ME
router.get('/me', async (req,res)=>{

  const token=(req.headers['authorization']||'').split(' ')[1];

  if(!token){
    return res.status(401).json({error:'Unauthorized'});
  }

  try{

    const decoded=verifyToken(token);

    const result=await pool.query(
      `SELECT id,username,email,role
       FROM users
       WHERE id=$1`,
      [decoded.sub]
    );

    res.json({
      user:result.rows[0]
    });

  }catch(err){

    res.status(401).json({
      error:'Invalid token'
    });

  }

});


// HEALTH
router.get('/health',(req,res)=>{

  res.json({
    status:'ok',
    service:'auth-service'
  });

});

=======
const express = require('express');
const bcrypt = require('bcryptjs');
const { pool } = require('../db/db');
const { generateToken, verifyToken } = require('../middleware/jwtUtils');

const router = express.Router();

const DUMMY_BCRYPT_HASH =
'$2b$10$CwTycUXWue0Thq9StjUM0uJ8y0R6VQwWi4KFOeFHrgb3R04QLbL7a';

async function logEvent(data) {
  try {
    await fetch('http://log-service:3003/api/logs/internal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  } catch (_) {}
}

// เพิ่มฟังก์ชัน Register ใน auth.js
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // เข้ารหัสลับรหัสผ่าน
    await pool.query(
      'INSERT INTO users (username, email, password_hash, role) VALUES ($1, $2, $3, $4)',
      [username, email.toLowerCase().trim(), hashedPassword, 'member']
    );
    res.status(201).json({ message: 'สร้างบัญชีสำเร็จ' });
  } catch (err) {
    res.status(400).json({ error: 'มีข้อผิดพลาด หรือ Email ซ้ำ' });
  }
});

// LOGIN
router.post('/login', async (req, res) => {

  const { email, password } = req.body;
  const ip = req.headers['x-real-ip'] || req.ip;

  if (!email || !password) {
    return res.status(400).json({
      error: 'กรุณากรอก email และ password'
    });
  }

  const normalizedEmail = email.trim().toLowerCase();

  try {

    const result = await pool.query(
      'SELECT id, username, email, password_hash, role FROM users WHERE email=$1',
      [normalizedEmail]
    );

    const user = result.rows[0] || null;

    const passwordHash = user ? user.password_hash : DUMMY_BCRYPT_HASH;

    const isValid = await bcrypt.compare(password, passwordHash);

    if (!user || !isValid) {

      await logEvent({
        service:'auth-service',
        level:'WARN',
        event:'LOGIN_FAILED',
        ip_address:ip,
        message:`Login failed for ${normalizedEmail}`
      });

      return res.status(401).json({
        error:'Email หรือ Password ไม่ถูกต้อง'
      });
    }

    const token = generateToken({
      sub:user.id,
      email:user.email,
      role:user.role,
      username:user.username
    });

    res.json({
      message:'Login สำเร็จ',
      token,
      user:{
        id:user.id,
        username:user.username,
        email:user.email,
        role:user.role
      }
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error:'Server error'
    });

  }
});


// VERIFY
router.get('/verify',(req,res)=>{

  const token=(req.headers['authorization']||'').split(' ')[1];

  if(!token){
    return res.status(401).json({
      valid:false
    });
  }

  try{

    const decoded=verifyToken(token);

    res.json({
      valid:true,
      user:decoded
    });

  }catch(err){

    res.status(401).json({
      valid:false
    });

  }

});


// ME
router.get('/me', async (req,res)=>{

  const token=(req.headers['authorization']||'').split(' ')[1];

  if(!token){
    return res.status(401).json({error:'Unauthorized'});
  }

  try{

    const decoded=verifyToken(token);

    const result=await pool.query(
      `SELECT id,username,email,role
       FROM users
       WHERE id=$1`,
      [decoded.sub]
    );

    res.json({
      user:result.rows[0]
    });

  }catch(err){

    res.status(401).json({
      error:'Invalid token'
    });

  }

});


// HEALTH
router.get('/health',(req,res)=>{

  res.json({
    status:'ok',
    service:'auth-service'
  });

});

>>>>>>> 57e685cc62836a15e96b86bab455df6805f8ccd6
>>>>>>> 3b08dcd8df74ba294549f8716d67106621ddf38c
module.exports = router;