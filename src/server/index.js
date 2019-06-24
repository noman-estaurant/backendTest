const express = require('express')
const bodyParser = require('body-parser')
const https = require('https')
const fs = require('fs')
const config = require('../../setting/config')

const api = require('../../api/index')

const app = express()

const options = {
  ca : fs.readFileSync(config.ssl.ca),
  key: fs.readFileSync(config.ssl.key),
  cert:fs.readFileSync(config.ssl.cert)
}

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.get('/', (req, res) => {
  res.sendFile(`${config.root}/dist/index.html`)
})

app.use(express.static('dist'))

app.use('/api', api)


https.createServer(options, app).listen(17785, () => {
  console.log(`listen on port:17785`)
})
