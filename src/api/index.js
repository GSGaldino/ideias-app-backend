const express = require('express');

const emojis = require('./emojis');
const users = require('./users');
const session = require('./session');
const login = require('./login');
const ideas = require('./ideas');

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
router.use('/ideas', ideas);

module.exports = router;
