require('dotenv').config();
const jwt = require('jsonwebtoken');

const payload = {
  userId: '64f2a1b2c3d4e5f6a7b8c9d0',
  role: 'hr'
};

const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
console.log('Token:', token);