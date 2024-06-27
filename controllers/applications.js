const express = require('express')
const router = express.Router()

const User = require('../models/user')

router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        res.render('applications/index.ejs', {
            applications: currentUser.applications,
        })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.get('/new', (req, res) => {
    res.render('applications/new.ejs')
})

router.post('/', async (req, res) => {
    try {
        // Look up the user from req.session
        const currentUser = await User.findById(req.session.user._id);
        // Render index.ejs, passing in all of the current user's 
        // applications as data in the context object. 
        res.render('applications/index.ejs', {
          applications: currentUser.applications,
        });
      } catch (error) {
        // If any errors, log them and redirect back home
        console.log(error)
        res.redirect('/')
      }
  });

module.exports = router