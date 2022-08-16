const express = require('express');
const router = express.Router();

const app = express()

// Import register and login views
const { registerView, loginView } = require('../controllers/loginController')

// Routes
app.get('/register', registerView)
app.get('/login', loginView)

// Export Login & Register Routes
module.exports = router