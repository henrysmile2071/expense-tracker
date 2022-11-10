//require and constants
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const PORT = process.env.PORT

//middleware
app.engine('hbs', exphbs({ default: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//route
app.get('/', (req, res) => {
  res.render('index')
})

//set listener
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})