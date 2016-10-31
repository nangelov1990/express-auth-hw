'use strict'
const express = require('express')
let app = express()

const env = process.env.NODE_ENV || 'development'
let config = require('./server/config/config')[env]

require('./server/config/database')(config)
// TODO: require express
// TODO: require routes
// TODO: require passport

app.listen(2993)
console.log('Express running')
