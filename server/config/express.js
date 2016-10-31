'use strict'
const express = require('express')

module.exports = (app, config) => {
  app.set('view engine', 'pug')
  app.set('views', config.rootPath + 'server/views')

  // TODO: cookie parser
  // TODO: body parser
  // TODO: session
  // TODO: passport
  app.use(express.static(config.rootPath + 'public'))

  console.log('Express running')
}
