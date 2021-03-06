'use strict'
const home = require('./home')
const users = require('./users')
const articles = require('./articles')

let notFound = (req, res) => {
  res.status = 404
  res.render('shared/layout', { globalErr: '404 Not Found' })
}

module.exports = {
  notFound,
  home,
  users,
  articles
}
