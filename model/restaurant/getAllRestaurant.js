const axios = require('axios')
const connection = require('../../database/mysql')
//const apiKey = require('../../setting/config').googleMapKey
//const googleMapApi = `https://maps.googleapis.com/maps/api/directions/json?`

const getAllRestaurant = (lat, lng) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT name, address, lat, lng FROM restaurant',
      async (err, rows, fields) => {
        if (err) reject(err)
        else {
          try {
            for (let i = 0; i < rows.length; i++) {
              rows[i].wait = Math.floor( Math.random() * 55 + 5 )
            }
            resolve(rows)
          } catch(e) {
            reject(e)
          }
        }
      }
    )
  })
}

/*const addDuration = (olat, olng, dlat, dlng) => {
  return new Promise((resolve, reject) => {
    axios.get(`${googleMapApi}origin=${olat},${olng}&destination=${dlng},${dlat}&key=${apiKey}`)
      .then(result => {
        try {
          resolve(result.data.routes[0].legs[0].distance.value)
        } catch(e) {
          reject(e)
        }
      })
  })
}*/

module.exports = getAllRestaurant
