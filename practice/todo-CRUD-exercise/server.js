//npm install express mongoose ejs dotenv
//npm install --save-dev nodemon

//"start": "nodemon server.js"

//Declare Variables
const express = require("express");
const app = express();
const mongoose = require("mongoose");
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
// app.use('/edit', editRoutes)


        
        //UPDATE METHOD
        app
        .route("/edit/:id")
        .get((req, res) => {
            const id = req.params.id;
            TodoTask.find({}, (err, tasks) => {
                res.render("edit.ejs", { todoTasks: tasks, idTask: id });
            });
        })
        .post((req, res) => {
            const id = req.params.id;
            TodoTask.findByIdAndUpdate(
                id,
                {
                    title: req.body.title,
                    content: req.body.content
                },
                
                err => {
                    if (err) return res.status(500).send(err);
                    res.redirect("/");
                });
            });
            
            //DELETE
            app
            .route("/remove/:id")
            .get((req, res) => {
                const id = req.params.id;
                TodoTask.findByIdAndRemove(id, err => {
                    if (err) return res.send(500, err);
                    res.redirect("/");
                });
            });
            
            //Start Server
            const PORT = process.env.PORT || 8000
            app.listen(PORT, () => console.log(`Server running on port ${PORT}`));