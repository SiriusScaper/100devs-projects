//Module Imports
const express = require('express')
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const loginController = require('../controllers/login') 

// Controllers
router.get('/', loginController.getLogin)
router.get('/new-acct', loginController.getSignup)
router.get('/logout', loginController.getLogout)
router.post('/', loginController.getLogin)
router.post('/new', loginController.postSignup)


module.exports = router