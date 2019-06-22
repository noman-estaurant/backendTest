const connection = require('../../database/mysql')

const createOrder = (id, amount, userId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO orderList (id, amount, user_id) VALUES ('${id}', '${amount}', '${userId}')`,
      (err, rows, fields) => {
        if (err) reject(err)
        resolve()
      }
    )
  })
}

module.exports = createOrder
