// index.js
const express = require('express')
const router = express.Router()

//Router modules
const home = require('./modules/home')
const users = require('./modules/users')
const auth = require('./modules/auth')
const { authenticator } = require('../middleware/auth')
//Routes

//Routes to Login and Registry 
router.use('/users', users)
//Route to FB authentication
router.use('/auth', auth)
//Routes to index
router.use('/', authenticator, home)

//export router
module.exports = router