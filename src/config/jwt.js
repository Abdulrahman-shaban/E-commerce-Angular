// /server/src/config/jwt.js
module.exports = {
  secret: process.env.JWT_SECRET || 'secret123',
  expiresIn: '30d',
};
