const { verifyToken } = require('./jwtUtils');

module.exports = function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
<<<<<<< HEAD
    return res.status(401).json({ error: 'Unauthorized' });
=======
    return res.status(401).json({ message: 'missing token' });
>>>>>>> 3b08dcd8df74ba294549f8716d67106621ddf38c
  }

  try {
    req.user = verifyToken(token);
    next();
  } catch (err) {
<<<<<<< HEAD
    return res.status(401).json({ error: 'Invalid token' });
=======
    return res.status(401).json({ message: 'invalid or expired token' });
>>>>>>> 3b08dcd8df74ba294549f8716d67106621ddf38c
  }
};