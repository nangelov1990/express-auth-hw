'use strict'
const express = require('express')
let app = express()

const env = process.env.NODE_ENV || 'development'

app.listen(2993)
console.log('Express running')
