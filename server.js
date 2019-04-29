
// Initiate express app
const express = require('express');
const app = express();
const { Stock } = require('./models');
const { Timeserie } = require('./models');

// Connect bodyParser to app
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect passport for authentication
const passport = require('passport');
require('./models/users.model');
require('./config/passport');
app.use(passport.initialize());

//Middleware for CORS
const cors = require('cors');
app.use(cors());

/*express.static is a built in middleware function to serve static files.
 We are telling express server public folder is the place to look for the static files
*/
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// Connect app to DB
const mongoose = require('mongoose');
const config = require('./config/database');
if (process.env.NODE_ENV !== 'production') {
  mongoose.connect(config.database)
} else {
  mongoose.connect(process.env.MONGODB_URI)
};

// Load env variables using dotenv
const dotenv = require('dotenv');
dotenv.config();

// routing
const apiRoute = require('./routes');
app.use('/api', apiRoute);

// error handlers
// Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({
      "message": "You are not authorized to use this resource."
    });
  };
});

// Pull aplha vantage API to populate data
const getStockData = (stock) => {
  return new Promise(function (resolve, reject) {
    //npm install request
    const request = require('request');
    const apiKey = process.env.ALPHAVANTAGE_KEY;
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stock.symbol}&apikey=${apiKey}&outputsize=compact`

    request(url, function (err, res, body) {
      try {
        const json = JSON.parse(body);
        const parsedJson = json["Time Series (Daily)"]

        Object.keys(parsedJson).forEach(function (timestamp, index) {
          Timeserie.find({
            date: timestamp,
            stock_id: stock._id
          }, (err, existed) => {
            // Find the appropriate timeserie using timestamp and stock ID
            // IF the time serie is save before, dont save it again
            // else create a new record
            if (existed.length == 0) {
              value = parsedJson[timestamp]
              const timeSerie = new Timeserie({
                date: timestamp,
                open: value["1. open"],
                close: value["4. close"],
                high: value["2. high"],
                low: value["3. low"],
                stock_id: stock._id
              });
              timeSerie.save();
            };
          });
        });
      } catch (err) {
        console.log("Saving timeseries failed, please try again.")
      };
    });
  });
};

const cron = require('node-cron');
// Run Mon-Fri, 6PM New York Time
cron.schedule('00 00 22 * * 1-5', function () {
  console.log("Importing new data")
  Stock.find({}, (_, stocks) => {
    if (stocks == undefined) { stocks = [] }
    stocks.forEach(stock => {
      getStockData(stock).then(result => {
        Timeserie.find({ stock_id: stock._id }, (err, ts) => {
          const todayTs = ts[0]
          stock.updatedAt = todayTs.date
          stock.current_price = todayTs.close
          stock.save();
        });
      });
    });
  });
});

//Declaring Port
const port = 3000;
app.listen(port, () => {
  console.log(`Starting the server at port ${port}`);
});

