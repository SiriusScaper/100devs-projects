//Module Imports
const express = require('express')
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const loginController = require('../controllers/login') 

// Controllers
router.get('/new-acct', loginController.getSignup)
router.get('/logout', loginController.getLogout)
router.post('/', loginController.getLogout)
router.get('/logout', loginController.getLogout)


module.exports = router