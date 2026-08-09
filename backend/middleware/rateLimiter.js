const rateLimit = require('express-rate-limit');

const sensitiveLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many requests, try again later' }
});

module.exports = { sensitiveLimiter };