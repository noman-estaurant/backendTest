const connection = require('../../database/mysql')

module.exports = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM main_course',
      (err, rows, fields) => {
        if (err) reject(err)
        resolve(rows)
      }
    )
  })
}
