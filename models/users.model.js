var crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  hash: String,
  salt: String
}, { timestamps: true });

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password){
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJWT = function(){
  const expired_at = new Date();
  expired_at.setDate(expired_at.getDate() + 7) // Expire in 7 days from now

  const payload = {
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expired_at.getTime() / 1000)
  }

  return jwt.sign(payload, process.env.APP_SECRET)
}

const User = mongoose.model('User', userSchema);
module.exports = User;