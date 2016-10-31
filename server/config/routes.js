'use strict'
let controllers = require('../controllers')

module.exports = (app) => {
  app.get('/', controllers.home.index)
}
