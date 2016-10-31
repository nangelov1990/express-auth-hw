'use strict'
const Article = require('mongoose').model('Article')

module.exports = {
  list: (req, res) => {
    Article
      .find({})
      .then(articles => {
        res.render('articles/list', { articles })
      })
  }
}
