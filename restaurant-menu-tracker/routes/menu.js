//Module Imports
const express = require('express')
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth')

//Import controller
const menuController = require('../controllers/menu') 

// Read
router.get('/', menuController.getIndex)
router.get('/:id', menuController.editMenu)

//Delete
router.get('/delete/:id', menuController.deleteMenu)

//Create
router.post('/save', menuController.saveMenu)
router.post('/new', menuController.newMenu)

module.exports = router