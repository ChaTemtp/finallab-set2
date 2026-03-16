const jwt = require('jsonwebtoken');

function verifyToken(token) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not set');
  }
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { verifyToken };