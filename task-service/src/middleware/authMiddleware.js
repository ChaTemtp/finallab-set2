<<<<<<< HEAD
=======
<<<<<<< HEAD
const { verifyToken } = require('./jwtUtils');

module.exports = function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'missing token' });
  }

  try {
    req.user = verifyToken(token);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'invalid or expired token' });
  }
=======
>>>>>>> 3b08dcd8df74ba294549f8716d67106621ddf38c
const { verifyToken } = require('./jwtUtils');

module.exports = function requireAuth(req, res, next) {
  const header = req.headers['authorization'] || '';
  const token  = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }
  try {
    req.user = verifyToken(token);  // { sub, email, role, username }
    next();
  } catch (err) {
    // ส่ง log JWT error ไปยัง Log Service (fire-and-forget)
    fetch('http://log-service:3003/api/logs/internal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service: 'task-service', level: 'ERROR', event: 'JWT_INVALID',
        ip_address: req.headers['x-real-ip'] || req.ip,
        message: 'Invalid JWT token: ' + err.message,
        meta: { error: err.message }
      })
    }).catch(() => {});
    return res.status(401).json({ error: 'Unauthorized: ' + err.message });
  }
<<<<<<< HEAD
=======
>>>>>>> 57e685cc62836a15e96b86bab455df6805f8ccd6
>>>>>>> 3b08dcd8df74ba294549f8716d67106621ddf38c
};