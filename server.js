
// Initiate express app
const express = require('express')
const app = express();

// Connect bodyParser to app
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}));
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
}

// Load env variables using dotenv
const dotenv = require('dotenv');
dotenv.config();

//Declaring Port
const port = 3000;
app.listen(port, () => {
  console.log(`Starting the server at port ${port}`);
});
