<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3b08dcd8df74ba294549f8716d67106621ddf38c
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'secret';

function generateToken(payload) {
<<<<<<< HEAD
  return jwt.sign(payload, SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h'
  });
}

function verifyToken(token) {
  return jwt.verify(token, SECRET);
}

module.exports = { generateToken, verifyToken };
=======

  return jwt.sign(
    payload,
    SECRET,
    { expiresIn: process.env.JWT_EXPIRES || '1h' }
  );

}

function verifyToken(token){

  return jwt.verify(token, SECRET);

}

module.exports = {
  generateToken,
  verifyToken
=======
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'secret';

function generateToken(payload) {

  return jwt.sign(
    payload,
    SECRET,
    { expiresIn: process.env.JWT_EXPIRES || '1h' }
  );

}

function verifyToken(token){

  return jwt.verify(token, SECRET);

}

module.exports = {
  generateToken,
  verifyToken
>>>>>>> 57e685cc62836a15e96b86bab455df6805f8ccd6
};
>>>>>>> 3b08dcd8df74ba294549f8716d67106621ddf38c
