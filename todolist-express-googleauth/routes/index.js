const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Story = require('../models/User')

// @desc Login/Landing Page
// @route GET /
router.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login'
  })
});

// @desc Dashboard
// @route GET /dashbaord
router.get('/index', ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user.id }).lean()
    res.render('index', {
      name:req.user.firstName,
      stories
    })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
});

module.exports = router