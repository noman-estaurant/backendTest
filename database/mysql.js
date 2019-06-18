const mysql = require('mysql')
const config = require('../setting/config')

const connection = mysql.createPool(config.mysql)

module.exports = connection
