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
router.get('/stocks/:id', auth, ctrlStock.getStock);
router.post('/stock', auth, ctrlStock.postStock);
router.delete('/stock/:id', auth, ctrlStock.delStock);
router.put('/stock/:id', auth, ctrlStock.updateStock);



module.exports = router;