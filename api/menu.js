const express = require('express')
const router = express.Router()

const getAllMainCourse = require('../model/menu/getAllMainCourse')

router.get('/', async (req, res) => {
  const result = await getAllMainCourse()
  res.status(200).send({
    status: 'successful',
    result
  })
})

module.exports = router
