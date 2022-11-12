//require and constants
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const PORT = process.env.PORT
const routes = require('./routes')

//middleware
app.engine('hbs', exphbs({ default: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//route
app.use(routes)

//set listener
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})