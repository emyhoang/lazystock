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

const delStock = (req, res) => {
  console.log(req.params.id)
  Stock.findByIdAndRemove(req.params.id , (err) => {
    if (err) return res.status(500).send(err);
    const response = {
      message: 'Stock succesfully deleted',
      stockId: req.params.id
    } 
    return res.status(200).send(response);
  });
}

module.exports = {
  getStocks,
  postStock,
  delStock
}