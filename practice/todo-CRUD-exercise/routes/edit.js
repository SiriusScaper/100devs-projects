const router = require('express').Router()
const editController = require('../controllers/home.controller') 

// Edit Task
router.get('/edit/:id', editController)

// Delete Task