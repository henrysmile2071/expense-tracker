// home.js
const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const moment = require('moment')
// routes
//To index page
router.get('/', async (req, res) => {
  try {
    const userId = req.user._id
    let categoryId = req.query.category || false
    const category = await Category.find().lean()

    let records = await Record.find({ userId }).lean()

    let totalAmount = 0

    if (categoryId) {
      records = records.filter(record => record.categoryId == categoryId)
    }

    records.forEach(record => {
      record.icon = category.find(category => record.categoryId.toString() === category._id.toString()).icon
      totalAmount += record.amount
      record.date = record.date.toISOString().slice(0, 10)
    })

    res.render('index', { records, category, totalAmount, categoryId })
  } catch (error) { console.error(error) }
})

//To new entry page
router.get('/new', async (req, res) => {
  try {
    const category = await Category.find().lean()
    res.render('new', { category })
  } catch (error) { console.error(error) }
})

//Submit new entry
router.post('/new', (req, res) => {
  const recordData = req.body
  recordData.userId = req.user._id
  return Record.create(recordData)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//To edit page
router.get('/edit/:_id', async (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params._id
    const category = await Category.find().lean()
    const record = await Record.findOne({ _id, userId }).lean()
    record.date = record.date.toISOString().slice(0, 10)
    res.render('edit', { category, record })
  } catch (error) { console.error(error) }
})

//Submit edit
router.put('/edit/:_id', (req, res) => {
  const recordData = req.body
  const _id = req.params._id
  const userId = req.user._id
  recordData.userId = userId
  return Record.findByIdAndUpdate(_id, req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//Delete
router.delete('/:_id', (req, res) => {
  const _id = req.params._id
  const userId = req.user._id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router