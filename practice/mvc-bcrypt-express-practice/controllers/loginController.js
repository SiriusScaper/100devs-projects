// Register Page
const registerView =  (req, res) => {
  res.render('register', {

  })
}

// Login Page
const loginView =  (req, res) => {
  res.render('login', {

  })
}

// Export views
module.exports = {
  registerView,
  loginView
}