const express = require('express');
const router = express.Router();

const connection = require('../database');


//CREATE
router.post('/', async (req, res) => {
  try {
    const body = req.body;
    const user = {
      username: body.username,
      tel_or_email: body.tel_or_email,
      password: body.password,
      cpf: body.cpf,
      birthdate: body.birthdate
    }
    if (!body.username || !body.tel_or_email || !body.password || !body.cpf || !body.birthdate) {
      return res.status(400).json({
        error: 'Missing required parameter!'
      })
    }

    const [globalId] = await connection('users')
      .insert(user);

    res.json({
      message: `Success inserted user ${user.username} with global id: ${globalId}!`
    })

  } catch (error) {
    if(error.code === 'SQLITE_CONSTRAINT'){
      return res.status(400).json({
        error: 'Phone or email already registered! Please chose another one.'
      })
    }
  }
})

// LIST
router.get('/', async (req, res) => {
  const users = await connection('users')
    .select('*');

  if (users.length == 0) {
    return res.json({
      message: 'No user registered in the database yet'
    })
  }

  res.json(users);
})

module.exports = router;
