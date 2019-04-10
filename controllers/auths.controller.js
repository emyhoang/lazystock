const passport = require('passport');
const mongoose = require('mongoose');
const { User }  = require('../models');

const login = (req, res) => {
  passport.authenticate('local', function(err, user, info){
    if(err) {
      res.status(404).json(err)
      return;
    }

    if(user){
      const token = user.generateJWT();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
    })(req, res);
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
      const token = user.generateJWT();
      res.status(200);
      res.json({
        "token" : token
      })
    }
  })
}

module.exports = {
  login,
  register
}