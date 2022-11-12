// home.js
const express = require('express')
const router = express.Router()

// routes
//To index page
router.get('/', (req, res) => {
  res.render('index')
})

//To new entry page
router.get('/new', (req,res) => {
  res.render('new')
})

//Submit new entry
router.post('/new', (req, res) => {
  res.redirect('/')
})
module.exports = router