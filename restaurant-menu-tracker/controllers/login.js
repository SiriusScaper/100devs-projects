const schemas = require('../models/schemas.js')
const bcrypt = require('bcrypt')


module.exports = {
  getLogin: (req, res) => {
  res.render('login', {title: 'Login', loggedIn: false, error:null})
},

  getSignup: (req, res) => {
res.render('new-acct', {title: 'New Account', loggedIn: false, error:null})
},

  getLogout: (req, res) => {
  req.session.destroy()
  res.redirect('/')
},
  postLogin: (req, res) => {
    let email = req.body.emailInput
    let pass = req.body.pwdInput
    let loginSuccess = false
    let sesh = req.session
    sesh.loggedIn = false

    let user = schemas.user
    let qry = {email: email}

    if(email != '' && pass != ''){
      let userResult = await.user.findOne(qry)
      .then(async data => {
        if (data) {
          let passResult = await bcrypt.compare(pass, data.pwd)
          .then((isMatch) => {
            if(isMatch){
              sesh.loggedIn = true
              loginSuccess = true
            }
          })
        }
      })
    }
    if(loginSuccess === true){
      res.redirect('/'){}
    } else {
      res.render('login', {title: 'Login', loggedIn: false, error: 'Invalid Login!' }) 
    }
  },
  postSignup: async(req, res) => {
    let email = req.body.emailInput
    let pass = req.body.pwdInput

    if(email !== '' && pass !== ''){
      let user = schemas.user
      let qry = {email:email}  
    }
    let userSearch = await user.findOne(qry)
    .then(async(data) => {
      if(!data){
        let saltRounds = 10
        let passSalt = await bcrypt.genSalt(saltRounds, async(err, salt) => {
          let passHash = await bcrypt.hash(pass, salt, async(err, hash) => {
            let acct = {email:email, pwd: hash, level:admin}
            let newUser = new schemas.user(acct)
            let saveUser = await newUser.save()
          })
        })
      }
    })
  }

}