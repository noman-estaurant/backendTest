const express = require('express')
const fetch = require("node-fetch")
const order = require('../model/order/findOrder')
const router = express.Router()

router.post('/', async (req, res) => {
  const amount = await order(req.body.orderId)
  console.log(req.body.id, amount[0].amount)
  const response = await fetch(`https://sandbox-api-pay.line.me/v2/payments/${req.body.id}/confirm`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF8',
      'X-LINE-ChannelId': '1590174875',
      'X-LINE-ChannelSecret': '61613e5e519e98803d475453f496a93b'
    },
    body: JSON.stringify({
      "amount": amount[0].amount,
      "currency": 'TWD'
    })
  })
  console.log(await response.json())
  res.send({status: true})
})

module.exports = router
