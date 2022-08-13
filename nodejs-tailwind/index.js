const express = require('express')
const path = require('path')

const app = express()

app.set('views' )

app.get('/', (req, res) => {
  res.send('It works')
})

const PORT = 3000

const server = app.listen(PORT || process.env.PORT , () => {
  console.log(`The application started on port ${server.address().port}`);
})