const express = require('express')
const fetch = require("node-fetch")
const uuidv4 = require('uuid/v4')
const auth = require('../model/apiAuth/index')
const order = require('../model/order/createOrder')
const router = express.Router()

router.post('/', (req, res) => {
  const orderId = uuidv4()
  fetch('https://sandbox-api-pay.line.me/v2/payments/request', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF8',
      'X-LINE-ChannelId': '1590174875',
      'X-LINE-ChannelSecret': '61613e5e519e98803d475453f496a93b'
    },
    body: JSON.stringify({
      "amount": `${req.body.amount}`,
      "productImageUrl": "https://placehold.it/84x84",
      "confirmUrl": `${req.body.confirmUrl}?orderId=${orderId}`,
      "productName": `${req.body.productName}`,
      "orderId": `${orderId}`,
      "currency": `${req.body.currency}`
    })
  })
  .then(response => response.json())
  .then(async data => {
    const id = await auth(req.body.token)
    await order(orderId, req.body.amount, id)
    res.send({url: data.info.paymentUrl.web})
  })
})

module.exports = router
