const express = require('express');
const router = express.Router();

const connection = require('../database');

router.post('/', async (req, res) => {
  try {
    const {authorization} = req.headers;
    const {tel_or_email} = req.body;

    const user = await connection('users')
      .where('tel_or_email', tel_or_email)
      .andWhere('password', JSON.parse(authorization))
      .select('*')
      .first();

    if(!user){
      return res.status(404).json({
        error: 'Falha na autenticação!'
      })
    }
    console.log(user)
    res.json(user)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;
