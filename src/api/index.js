const express = require('express');

const emojis = require('./emojis');
const users = require('./users');
const session = require('./session');
const login = require('./login');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/emojis', emojis);
router.use('/users', users);
router.use('/session', session);
router.use('/login', login);

module.exports = router;
