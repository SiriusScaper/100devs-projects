const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')


router.get('/', (req, res) => {
  res.render('../views/login')
})

router.get('/index',async (req, res)=>{
  const todoItems = await db.collection('todos').find().toArray()
  const itemsLeft = await db.collection('todos').countDocuments({completed: false})
  res.render('../views/index', { items: todoItems, left: itemsLeft })
  // db.collection('todos').find().toArray()
  // .then(data => {
  //     db.collection('todos').countDocuments({completed: false})
  //     .then(itemsLeft => {
  //         res.render('index.ejs', { items: data, left: itemsLeft })
  //     })
  // })
  // .catch(error => console.error(error))
})

router.post('/addTodo', (req, res) => {
  db.collection('todos').insertOne({thing: req.body.todoItem, completed: false})
  .then(result => {
      console.log('Todo Added')
      res.redirect('../views/index')
  })
  .catch(error => console.error(error))
})

router.put('/markComplete', (req, res) => {
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

router.put('/markUnComplete', (req, res) => {
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

router.delete('/deleteItem', (req, res) => {
  db.collection('todos').deleteOne({thing: req.body.itemFromJS})
  .then(result => {
      console.log('Todo Deleted')
      res.json('Todo Deleted')
  })
  .catch(error => console.error(error))

})

module.exports = router