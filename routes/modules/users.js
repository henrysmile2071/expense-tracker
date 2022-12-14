// users.js
const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

// routes
//To login page
router.get('/login', (req, res) => {
  res.render('login')
})

//Submit Login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureMessage: true
}))

//To register page
router.get('/register', (req, res) => {
  res.render('register')
})

//Submit register
router.post('/register', (req, res) => {
  //Get form info
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: 'Please fill in all the fields.' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: 'Please make sure the passwords are the same！' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  //Check if user is already registered
  User.findOne({ email })
    .then(user => {
      //if the same email is found, show message and stay at register page 
      if (user) {
        errors.push({ message: 'This email has already been registered.' })
        return res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword,
        })
      }
      //if new user, create hashed password to add to db
      return User.create({
        name,
        email,
        password: bcrypt.hashSync(password, 10),
      })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
})

//Logout
router.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) { return next(err); }
  })
  req.flash('success_msg', 'You have successfully logged out.')
  res.redirect('/users/login')
})

module.exports = router