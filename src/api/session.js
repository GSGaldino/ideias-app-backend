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

router.post('/brain', async (req, res) => {
  const user_id = req.headers.authorization;

  const ideas = await connection('ideas')
    .where('user_id', user_id)
    .select('*')

  if(!ideas){
    return res.status(404).json({
      message: 'No ideas found with this id'
    })
  }
  res.json(ideas)
  console.log(user_id);
})

module.exports = router;
