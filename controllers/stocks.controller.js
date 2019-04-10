const mongoose = require('mongoose');
const { Stock } = require('../models');

const getStocks = (req, res) => {
 Stock.find({}, (err, stocks) => {
   if (err) {
     res.status(404).json(err)
     return;
   } else {
     res.status(200);
     return res.json({ "stocks" : stocks });
   }
 });
};

const postStock = (req, res) => {
  const stock = new Stock(req.body);
  stock.save(err => {
    if (err) {
      res.status(400);
      res.json({
        "message": "Couldn't create stock"
      })
    } else {
      res.status(201);
      return res.json({ "stock" : stock })
    }
  })
}

module.exports = {
  getStocks,
  postStock
}