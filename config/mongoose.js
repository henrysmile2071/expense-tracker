const mongoose = require('mongoose') //require mongoose
// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config()
// }
const MONGODB_URI = 'mongodb://localhost/expense-tracker'
//Mongoose connection
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }) //setting connection to mongoDB

const db = mongoose.connection

db.on('error', () => {
  console.log('mongoDB error!')
})

db.once('open', () => {
  console.log('mongoDB connected!')
})
module.exports = db