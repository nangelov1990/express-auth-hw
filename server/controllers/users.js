'use strict'
const encryption = require('../utilities/encryption')
const User = require('mongoose').model('User')

module.exports = {
  register: (req, res) => {
    res.render('users/register')
  },
  create: (req, res) => {
    let user = req.body
    let confirmedPassIncorrect =
      user.password !== user.confirmPassword
    if (confirmedPassIncorrect) {
      user.globalErr = 'Passwords do not match!'
      res.render('users/register', user)
    } else {
      user.salt = encryption.generateSalt()
      user.hashedPass = encryption.generateHashedPass(user.salt, user.password)

      User
        .create(user)
        .then(user => {
          req
            .logIn(user, (err, user) => {
              if (err) {
                user.globalErr = err
                res.render('users/register', user)
              }
            })

          res.redirect('/')
        })
    }
  },
  login: (req, res) => {
    res.render('users/login')
  },
  authenticate: (req, res) => {
    let inputUser = req.body
    User
      .findOne({username: inputUser.username })
      .then(user => {
        let correctPassword = user.authenticate(inputUser.password)
        if (!correctPassword) {
          res.render('users/login', { globalErr: 'Invalid username or password!'})
        } else {
          req.logIn(user, (err, user) => {
            if (err) {
              res.status = 500
              res.render('/users/login', { globalErr: 'Ooops 500' })
              return
            }
            
            res.redirect('/')
          })
        }
      })
  },
  logout: (req, res) => {
    req.logout()
    res.redirect('/')
  }
}
