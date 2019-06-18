const jwt = require('jsonwebtoken')
const connection = require('../../database/mysql')
const secret = require('../../setting/config').secret

module.exports = token => {
  return new Promise ((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) reject()
      //console.log(decoded)
      connection.query(
        `SELECT * FROM user WHERE id = ${decoded.index}`,
        (err, rows, fields) => {
          if (err) reject()
          if (rows.length > 0)
            resolve()
          reject()
        }
      )
    })
  })
}
