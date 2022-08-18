const router = require('express').Router()
const editController = require('../controllers/edit.controller') 

// Edit Task
router.get('/:id', editController.getTask)
router.get('/remove/:id', editController.deleteTask)
router.post('/:id', editController.updateTask)

// Delete Task

module.exports = router 