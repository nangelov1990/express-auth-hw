'use strict'
const home = require('./home')

let notFound = (req, res) => {
  res.status = 404
  res.render('shared/layout', { globalErr: '404 Not Found' })
}

module.exports = {
  notFound,
  home
}
