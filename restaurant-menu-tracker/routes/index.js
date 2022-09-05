//Module Imports
const express = require('express')
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth')

// Import controllers
const indexController = require('../controllers/index')

router.get('/', indexController.getHome)
// Search
router.post('/q', indexController.getSearch)

module.exports = router