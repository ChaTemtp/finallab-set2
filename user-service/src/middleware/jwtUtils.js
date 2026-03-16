const jwt = require('jsonwebtoken');

<<<<<<< HEAD
const SECRET = process.env.JWT_SECRET || 'secret';

function verifyToken(token) {
  return jwt.verify(token, SECRET);
=======
function verifyToken(token) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not set');
  }
  return jwt.verify(token, process.env.JWT_SECRET);
>>>>>>> 3b08dcd8df74ba294549f8716d67106621ddf38c
}

module.exports = { verifyToken };