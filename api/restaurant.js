const express = require('express')
const getAllRestaurant = require('../model/restaurant/getAllRestaurant')
const checkAuth = require('../model/apiAuth/index')
const router = express.Router()

router.all('*', async (req, res, next) => {
  const token = req.get('Authorization').split(' ')[1]
  try {
    await checkAuth(token)
    next()
  } catch (e) {
    res.send({'error': 'Not login'})
  }
})

router.post('/', async (req, res) => {
  const lat = req.body['userPosition_lat']
  const lng = req.body['userPosition_lng']
  if (lat && lng) {
    try {
      const restaurant = await getAllRestaurant(lat, lng)
      res.send({'restaurant': restaurant})
    } catch(e) {
      res.send(e)
    }
  } else {
    res.send({'error': 'Parameters are invalid'})
  }
})

module.exports = router
