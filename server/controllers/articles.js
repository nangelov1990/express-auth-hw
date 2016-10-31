'use strict'
const Article = require('mongoose').model('Article')

module.exports = {
  add: (req, res) => {
    res.render('articles/add')
  },
  create: (req, res) => {
    let article = req.body
    article.author = req.user.username

    Article
      .create(article)
      .then(article => {
        res.render('home/index', { globalErr: 'Article added!' })
        // TODO: go to article details
      })
  },
  list: (req, res) => {
    Article
      .find({})
      .then(articles => {
        res.render('articles/list', { articles })
      })
  },
  details: (req, res, id) => {
    Article
      .findOne({ _id: id })
      .then(article => {
        article.canEdit =
          req.user.username === article.author ||
            req.user.roles.indexOf('Admin') > -1

        res.render('articles/details', { article })
      })
  },
  edit: (req, res, id) => {
    Article
      .findOne({ _id: id })
      .then(article => {
        if (req.user.username === article.author ||
            req.user.roles.indexOf('Admin') > -1) {
          res.render('articles/edit', article)
        } else {
          res.redirect('/articles/details/' + article._id)
        }
      })
  },
  put: (req, res, id) => {
    // TODO: check if user can update
    Article
      .findOneAndUpdate(
        { _id: id },
        { $set: { title: req.body.title, content: req.body.content } },
        { new: true },
        (err, article) => {
          if (err) console.error(err)
          res.redirect('/articles/details/' + article._id)
        }
      )
  },
  delete: (req, res, id) => {
    // TODO: check if user can delete
    Article
      .findOneAndRemove(
        { _id: id },
        err => {
          if (err) console.error(err)
          res.redirect('/articles/list')
        }
      )
  }
}
