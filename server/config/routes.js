'use strict'
const controllers = require('../controllers')
const auth = require('./auth')

module.exports = (app) => {
  app.get('/', controllers.home.index)
  app.get('/about', controllers.home.about)

  app.get('/articles/list', controllers.articles.list)

  app.all('/users/:method/:id?', (req, res, next) => {
    let method = req.params.method
    let id = req.params.id
    try {
      controllers['users'][method](req, res, id)
    } catch (err) {
      console.error(err)
      next()
    }
  })

  app.all('/:controller/:method/:id?', auth.isAuthenticated, (req, res, next) => {
    let controller = req.params.controller
    let method = req.params.method
    let id = req.params.id
    try {
      controllers[controller][method](req, res, id)
    } catch (err) {
      console.error(err)
      next()
    }
  })

  app.all('*', controllers.notFound)
}
