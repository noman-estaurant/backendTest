const fetch = require("node-fetch")

fetch('https://sandbox-api-pay.line.me/v2/payments/request', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=UTF8',
    'X-LINE-ChannelId': '1590174875',
    'X-LINE-ChannelSecret': '61613e5e519e98803d475453f496a93b'
  },
  body: JSON.stringify({
    "amount": 400,
    "productImageUrl": "https://placehold.it/84x84",
    "confirmUrl": "https://luffy.ee.ncku.edu.tw:17787/#/main",
    "productName": "測試產品",
    "orderId": "123456",
    "currency": "TWD"
  })
})
.then(res => res.json())
.then(data => console.log(data))