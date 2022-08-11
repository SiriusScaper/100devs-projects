const express = require('express')
const dotenv = require('dotenv')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const MongoClient = require('mongodb').MongoClient
const connectDB = require('./config/db')
const { default: mongoose } = require('mongoose')



// Load Config
dotenv.config({path: './config/.env'})

// Passport Config
require('./config/passport')(passport)

connectDB()

const app = express()


let db,
    dbConnectionStr = process.env.MONGO_URI,
    dbName = 'todo'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
    
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Sessions
app.use(session({
    secret: 'keyboard dog',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ 
        mongoUrl: process.env.MONGO_URI
        })
    })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())


// Routes
// app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
// app.use('/todos', require('./routes/todos'));

app.get('/', (req, res) => {
    res.render('login.ejs')
})

app.get('/index',async (req, res)=>{
    const todoItems = await db.collection('todos').find().toArray()
    const itemsLeft = await db.collection('todos').countDocuments({completed: false})
    res.render('index.ejs', { items: todoItems, left: itemsLeft })
    // db.collection('todos').find().toArray()
    // .then(data => {
    //     db.collection('todos').countDocuments({completed: false})
    //     .then(itemsLeft => {
    //         res.render('index.ejs', { items: data, left: itemsLeft })
    //     })
    // })
    // .catch(error => console.error(error))
})

app.post('/addTodo', (req, res) => {
    db.collection('todos').insertOne({thing: req.body.todoItem, completed: false})
    .then(result => {
        console.log('Todo Added')
        res.redirect('/index')
    })
    .catch(error => console.error(error))
})

app.put('/markComplete', (req, res) => {
    db.collection('todos').updateOne({thing: req.body.itemFromJS},{
        $set: {
            completed: true
        }
    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('Marked Complete')
        res.json('Marked Complete')
    })
    .catch(error => console.error(error))

})

app.put('/markUnComplete', (req, res) => {
    db.collection('todos').updateOne({thing: req.body.itemFromJS},{
        $set: {
            completed: false
        }
    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('Marked Complete')
        res.json('Marked Complete')
    })
    .catch(error => console.error(error))

})

app.delete('/deleteItem', (req, res) => {
    db.collection('todos').deleteOne({thing: req.body.itemFromJS})
    .then(result => {
        console.log('Todo Deleted')
        res.json('Todo Deleted')
    })
    .catch(error => console.error(error))

})

const PORT = process.env.PORT || 9000

app.listen(PORT, console.log(`Server running ${process.env.NODE_ENV} mode on port ${PORT}`))