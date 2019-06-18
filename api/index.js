const express = require('express')
const router = express.Router()

const restaurant = require('./restaurant')
const login = require('./login')
const menu = require('./menu')

// CORS setting
router.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
})

router.use('/restaurant', restaurant)

router.use('/login', login)

router.use('/menu', menu)

module.exports = router