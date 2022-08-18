const router = require('express').Router()
const homeController = require('../controllers/home.controller')

// Request todo tasks
router.get('/', homeController.getIndex)
router.post('/', homeController.createTask)

module.exports = router