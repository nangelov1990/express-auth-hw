'use strict'
const controllers = require('../controllers')
const auth = require('./auth')

module.exports = (app) => {
  app.get('/', controllers.home.index)
  app.get('/about', controllers.home.about)

  app.get('/articles/list', controllers.articles.list)

  app.all('/users/:method/:id?', (req, res) => {
    let method = req.params.method
    let id = req.params.id
    controllers['users'][method](req, res, id)
  })

  app.all('/admin/:method/:id?', auth.isInRole('Admin'), (req, res) => {
    let method = req.params.method
    let id = req.params.id
    controllers['users'][method](req, res, id)
  })

  app.all('/:controller/:method/:id?', auth.isAuthenticated, (req, res) => {
    let controller = req.params.controller
    let method = req.params.method
    let id = req.params.id
    controllers[controller][method](req, res, id)
  })

  app.all('*', controllers.notFound)
}
