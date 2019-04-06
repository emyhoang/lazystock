const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const login = (req, res) => {
  res.status(200)
  res.json({
    "message": "User logged in: " + req.body.email
  })
}

const register = (req, res) => {
  const user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.setPassword(req.body.password),
  user.save(err => {
    if (err) {  
      res.status(400);
      res.json({
        "message": "Couldn't create user: " + req.body.email
      })
    } else {
      res.status(200);
      res.json({
        "message": "User registered: " + req.body.email
      })
    }
  })
}

module.exports = {
  login,
  register
}