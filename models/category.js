const mongoose = require('mongoose')
const Schema = mongoose.Schema
const categorySchema = new Schema({
  name: {
    type: String,
    required: true //required field
  },
  icon: {
    type: String,
    required: true
  }
})
module.exports = mongoose.model('Category', categorySchema)