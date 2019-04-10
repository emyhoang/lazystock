const express = require('express')
const router = express.Router();
const jwt = require('express-jwt');
const auth = jwt({
  secret: process.env.APP_SECRET,
  userProperty: 'payload'
})

const ctrlAuth = require('../controllers/auths.controller');
const ctrlStock = require('../controllers/stocks.controller');

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

router.get('/stocks', auth, ctrlStock.getStocks);
router.post('/stocks', auth, ctrlStock.postStock);


module.exports = router;