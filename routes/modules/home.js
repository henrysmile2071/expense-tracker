// home.js
const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

// routes
//To index page
router.get('/', async (req, res) => {
  try {
    const userId = req.user._id
    const category = await Category.find().lean()
    const records = await Record.find({ userId }).lean()
    let totalAmount = 0
    records.forEach(record => {
      record.icon = category.find(x => record.categoryId.toString() === x._id.toString()).icon
      totalAmount += record.amount
    })
    res.render('index', { records, category, totalAmount })
  } catch (error) { console.error(error) }
})

//To new entry page
router.get('/new', (req, res) => {
  res.render('new')
})

//Submit new entry
router.post('/new', (req, res) => {
  res.redirect('/')
})

//To edit page
router.get('/edit/:id', (req, res) => {
  console.log(req.params.id)
  res.render('edit')
})

//Submit edit
router.post('/edit/:id', (req, res) => {
  res.redirect('/')
})

module.exports = router