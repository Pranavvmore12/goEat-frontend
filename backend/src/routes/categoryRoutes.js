const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController.js');
const authenticate = require('../midleware/authenticate.js');

router.get('/restaurant/:id',authenticate, categoryController.getRestaurantsCategory);

module.exports = router;
