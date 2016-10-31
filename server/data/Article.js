'use strict'
const mongoose = require('mongoose')
const requiredValidationMessage = '{PATH} is required'

let articleSchema = mongoose.Schema({
  title: { type: String, required: requiredValidationMessage, unique: true },
  content: String,
  author: { type: String, ref: 'User' }
})

mongoose.model('Article', articleSchema)
