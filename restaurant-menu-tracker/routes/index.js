//Module Imports
const express = require('express')
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth')

// Import controllers
const indexController = require("../controllers/index")
const loginController = require("../controllers/login")
const menuController = require("../controllers/menu")


router.get('/', loginController.getLogin)
// Search
router.post('/q', indexController.getSearch)

module.exports = router