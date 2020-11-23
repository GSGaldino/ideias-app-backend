const express = require('express');
const router = express.Router();

const connection = require('../database');


// CREATE SESSION
router.post('/', async (req, res) => {
  try {
    const tel_or_email = req.headers.authorization;
    const user = await connection('users')
      .where('tel_or_email', tel_or_email)
      .select('*')
      .first();

    if (!user) {
      return res.status(400).json({
        error: 'Failed to create session!'
      })
    }

    res.json(user);

  } catch (error) {
    console.log(error)
  }
})

module.exports = router;
