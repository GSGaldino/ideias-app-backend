const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const connection = require('../database');

cloudinary.config({
  cloud_name: 'dh3fbmmvc',
  api_key: '423196966219377',
  api_secret: 'hAwP3ZzOR26GSsbKesRzjx51FqE'
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

// LIST
router.get('/', async (req, res) => {
  try {
    const ideas = await connection('ideas')
      .select('*');

    if (!ideas) {
      return res.json({
        message: 'You have no idea registered yet'
      })
    }
    return res.json(ideas)

  } catch (error) {
    return res.json(error)
  }
})

//CREATE
router.post('/', upload.single('foto1'), async (req, res) => {
  try {
    const localPath = req.file.path;
    const { ideaname, description, value } = req.body;
    const user_id = req.headers.authorization;
    let image_url;

    cloudinary.uploader.upload(localPath, async function (error, result) {
      image_url = await result.secure_url;
      const [idea] = await connection('ideas')
        .insert({
          ideaname,
          image_url,
          description,
          value,
          user_id
        })
      if(error) {
        console.log(error)
      }
      res.json(idea)
    });

  } catch (error) {
    console.log(error)
  }
})

module.exports = router;
