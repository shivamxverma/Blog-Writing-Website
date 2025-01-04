const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const secret = process.env.secret;

function createTokenForUser (user) {
    const payload = {
    _id: user._id, emait: user.email,
    profileImageURL: user.profileImageURL, role: user.role,
    };
    const token = jwt.sign(payload, secret);
  return token;
}

function validateToken (token) {
  const payload = jwt.verify(token, secret);
  return payload;
}

module.exports = { createTokenForUser , validateToken};