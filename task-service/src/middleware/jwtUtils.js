<<<<<<< HEAD
const jwt = require('jsonwebtoken');

function verifyToken(token) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not set');
  }
  return jwt.verify(token, process.env.JWT_SECRET);
}

=======
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

>>>>>>> 57e685cc62836a15e96b86bab455df6805f8ccd6
module.exports = { verifyToken };