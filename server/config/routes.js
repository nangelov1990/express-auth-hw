'use strict'
const controllers = require('../controllers')
const auth = require('./auth')

module.exports = (app) => {
  app.get('/', controllers.home.index)
  app.get('/about', controllers.home.about)

  app.all('/:controller/:method/:id?', (req, res) => {
    let controller = req.params.controller
    let method = req.params.method
    let id = req.params.id

    try {
      id
        ? controllers[controller][method](req, res)(id)
        : controllers[controller][method](req, res)
    } catch (err) {
      if (err) console.error(err)
      controllers.notFound(req, res)
    }
  })

  app.all('*', controllers.notFound)
}
