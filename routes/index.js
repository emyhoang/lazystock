const express = require('express')
const router = express.Router();
const ctrlAuth = require('../controllers/auths.controller');

router.post('/register', ctrlAuth.register);

module.exports = router;