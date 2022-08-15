const express = require('express')
const path = require('path')

const app = express()

app.set('views' )

app.get('/', (req, res) => {
  res.render('index')
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

const PORT = 3000

const server = app.listen(PORT || process.env.PORT , () => {
  console.log(`The application started on port ${server.address().port}`);
})