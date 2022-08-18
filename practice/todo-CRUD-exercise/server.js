//npm install express mongoose ejs dotenv
//npm install --save-dev nodemon

//"start": "nodemon server.js"

//Declare Variables
const express = require("express");
const app = express();
const dotenv = require('dotenv')

const homeRoutes = require('./routes/home')
const editRoutes = require('./routes/edit')

const connectDB = require('./config/db')
dotenv.config({path: './config/config.env'})

//Set Middleware
app.set("view engine", "ejs");
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

//Connect to Mongo
connectDB()

// Routes
app.use('/', homeRoutes)
app.use('/edit', editRoutes)

//Start Server
const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));