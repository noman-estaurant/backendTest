const connection = require('../../database/mysql')

const findOrder = id => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT amount FROM orderList WHERE id = '${id}'`,
      (err, rows, fields) => {
        if (err) reject(err)
        resolve(JSON.parse(JSON.stringify(rows)))
      }
    )
  })
}

module.exports = findOrder
