const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  symbol: {
    type: String,
    unique: true,
    required: true
  },
  current_price: Number,
}, { timestamps: true });

const Stock = mongoose.model('Stock', stockSchema);
module.exports = Stock;
