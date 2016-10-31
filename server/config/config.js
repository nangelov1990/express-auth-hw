'use strict'
const path = require('path')

let rootPath = path.normalize(path.join(__dirname, '/../../'))

module.exports = {
  development: {
    rootPath: rootPath,
    db: 'mongodb://localhost:27017/BLOG-express-hw',
    port: 2993
    // TODO: session secret
  }
}
