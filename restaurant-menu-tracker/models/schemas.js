const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema({
  name: {type: String, require: True},
  idon: {type: String, require: True},
  menuUrl: {type: String, require: True},
  entryDate: {type: Date, default: Date.now}
})

const userSchema = new mongoose.Schema({
  email: {type: String, require: True},
  pwd: {type: String, require: True},
  entryDate: {type: Date, default: Date.now}
})

const menu = mongoose.model('menu', menuSchema, 'menu')
const user = mongoose.model('user', userSchema, 'user')

module.exports = mySchemas = {
  'menu': menu,
  'user': user
}