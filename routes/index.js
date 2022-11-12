// index.js
const express = require('express')
const router = express.Router()

//Router modules
const home = require('./modules/home')
const users = require('./modules/users')

//Routes

//Routes to Login and Registry 
router.use('/users', users)

//Routes to index
router.use('/', home)

//export router
module.exports = router