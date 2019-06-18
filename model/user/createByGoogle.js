const { OAuth2Client } = require('google-auth-library')
const jwt = require('jsonwebtoken')

const connection = require('../../database/mysql')
const secret = require('../../setting/config').secret
const clientId = require('../../setting/config').clientId
const client = new OAuth2Client(clientId)

const checkExist = async id => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM user_google WHERE google_id = '${id}'`,
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

const createUserGoogle = (id, token) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO user_google VALUES (${id}, '${token}')`,
      (err, rows, fields) => {
        if (err) reject(err)
        resolve(true)
      }
    )
  })
}

module.exports = idToken => {
  return new Promise(async (resolve, reject) => {
    try {
      const ticket = await client.verifyIdToken({
        idToken,
        audience: clientId
      })
      const payload = ticket.getPayload()
      const userid = payload['sub']
      const res = await checkExist(userid)
      if (res !== false) {
        const jwtToken = jwt.sign({index: res}, secret, {
          expiresIn: '1d'
        })
        resolve(jwtToken)
      } else {
        const index = await createUser(payload['name'])
        const result = await createUserGoogle(index, userid)
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
