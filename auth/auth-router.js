const router = require('express').Router()
const bcrypt = require('bcryptjs')
const db = require('../database/dbConfig.js')

router.post('/register', async (req, res) => {
  const user = req.body
  const hash = bcrypt.hashSync(user.password, 15)
  user.password = hash
  try {
    if (user.username && user.password) {
      const newUser = await db('users').insert(user)
      console.log(newUser)
      res.status(201).json({
        message: "New user has been created"
      })
    } else {
      res.json({
        message: "Username and password are both required"
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

router.post('/login', async (req, res) => {
  const {
    username,
    password
  } = req.body
  const user = await db('users').where({
    username
  }).first()
  try {
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.user = user
      res.status(201).json({
        message: `Welcome ${user.username}`
      });
    } else {
      res.status(403).json({
        message: "Invalid credentials, please try again"
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

module.exports = router