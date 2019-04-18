const mongoose = require('mongoose');
const { Stock } = require('../models');
const { Timeserie } = require('../models');

const getStocks = (req, res) => {
  Stock.find({}, (err, stocks) => {
    if (err) {
      res.status(404).json(err);
      return;
    } else {
      res.status(200);
      return res.json({ "stocks": stocks });
    };
  });
};

const getStock = (req, res) => {
  Stock.findOne({ _id: req.params.id }, (err, stock) => {
    if (err) return res.status(500).send(err);
    const response = {
      message: 'Succesfully got a stock by Id',
      stock: stock
    };
    return res.status(200).send(response);
  });
};

const postStock = (req, res) => {
  const stock = new Stock(req.body);
  stock.save(err => {
    if (err) {
      res.status(400);
      res.json({
        "message": "Couldn't create stock"
      });
    } else {
      res.status(201);
      return res.json({ "stock": stock });
    };
  });
};

const delStock = (req, res) => {
  Stock.findByIdAndRemove(req.params.id, (err) => {
    if (err) return res.status(500).send(err);
    const response = {
      message: 'Stock succesfully deleted',
      stockId: req.params.id
    };
    return res.status(200).send(response);
  });
};

const updateStock = (req, res) => {
  Stock.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, stock) => {
      if (err) return res.status(500).send(err);
      return res.send(stock);
    });
};

const getTimeseries = (req, res) => {
  Timeserie.find({ stock_id: req.query.stock_id }, (err, timeSeries) => {
    if (err) {
      res.status(404).json(err);
      return;
    } else {
      res.status(200);
      let formattedTimeseries = [];
      timeSeries.forEach((ts) => {
        let array = [];
        array.push(ts["date"])
        array.push(parseFloat(ts["close"]))
        array.push(parseFloat(ts["high"]))
        array.push(parseFloat(ts["low"]))
        array.push(parseFloat(ts["open"]))
        array.push(117258400)
        formattedTimeseries.push(array)
      });
      return res.json(formattedTimeseries);
    };
  });
};

module.exports = {
  getStocks,
  getStock,
  postStock,
  delStock,
  updateStock,
  getTimeseries
};