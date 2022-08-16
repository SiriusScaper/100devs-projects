//Node Modules
const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

// Load config
dotenv.config({path:'./config/config.env'})

connectDB()

// Express 
const app = express();
app.set('view engine', 'ejs')

// Routes
app.use('/', require('./routes/login'));

// Server start config
const PORT = process.env.PORT || 4111
app.listen(PORT, console.log(`Sever started on ${PORT}`));