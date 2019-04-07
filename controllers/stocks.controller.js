const mongoose = require('mongoose');

const getStocks = (req, res) => {
  res.status(200);
  res.json({
    "stocks" : [{id: 1, name: "LYFT"}]
  })
}

module.exports = {
  getStocks
}