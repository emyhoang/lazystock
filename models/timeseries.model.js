const mongoose = require('mongoose');

const timeserieSchema = new mongoose.Schema({
  stock_id: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  open: {
    type: String,
    required: true
  },
  close: {
    type: String,
    required: true
  },
  low: {
    type: String,
    required: true
  },
  high: {
    type: String,
    required: true
  },
});

const Timeserie = mongoose.model('Timeserie', timeserieSchema);
module.exports = Timeserie;