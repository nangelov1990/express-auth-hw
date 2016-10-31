'use strict'
const mongoose = require('mongoose')
const encryption = require('encryption')
const requiredValidationMessage = '{PATH} is required'

let userSchema = mongoose.Schema({
  username: { type: String, required: requiredValidationMessage, unique: true },
  name: { type: String, required: requiredValidationMessage },
  salt: String,
  hashedPass: String,
  roles: [String]
})

userSchema.method({
  authenticate: function (password) {
    let correctPassword =
      encryption.generateHashedPass(this.salt, password) === this.hashedPass

    return correctPassword
  }
})

let User = mongoose.model('User', userSchema)

module.exports.seedAdminUser = () => {
  User
    .find({})
    .then(users => {
      if (users.length > 0) return

      let salt = encryption.generateHashedPass()
      let hashedPass = encryption.generateHashedPass(salt, 'admin')
      User
        .create({
          username: 'admin',
          name: 'Nikola Angelov',
          salt: salt,
          hashedPass: hashedPass,
          roles: ['Admin']
        })
    })
}
