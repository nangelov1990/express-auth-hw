'use strict'
let controllers = require('../controllers')

module.exports = (app) => {
  app.get('/', controllers.home.index)
  app.get('/about', controllers.home.about)

  app.all('/:controller/:method', (req, res) => {
    let controller = req.params.controller
    let method = req.params.method

    controllers[controller][method](req, res)
  })

  app.all('*', controllers.notFound)
}
