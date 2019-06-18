const jwt = require('jsonwebtoken')
const connection = require('../../database/mysql')

const secret = require('../../setting/config').secret

const checkExist = id => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM user_facebook WHERE facebook_id = '${id}'`,
      (err, rows, fields) => {
        if (rows.length > 0)
          resolve(rows[0].id)
        resolve(false)
      }
    )
  })
}

const createUser = name => {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO user (name) VALUES ('${name}')`,
      (err, rows, fields) => {
        if (err) reject(err)
        resolve(rows.insertId)
      }
    )
  })
}

const createUserFacebook = (id, fbId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO user_facebook VALUES (${id}, '${fbId}')`,
      (err, rows, fields) => {
        if (err) reject(err)
        resolve(true)
      }
    )
  })
}

module.exports = (id, name) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await checkExist(id)
      if (res !== false) {
        const jwtToken = jwt.sign({index: res}, secret, {
          expiresIn: '1d'
        })
        resolve(jwtToken)
      } else {
        const index = await createUser(name)
        const result = await createUserFacebook(index, id)
        const jwtToken = jwt.sign({index}, secret, {
          expiresIn: '1d'
        })
        resolve(jwtToken)
      }
    } catch(e) {
      reject(e)
    }
  })
}
