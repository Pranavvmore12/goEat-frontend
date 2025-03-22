const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController.js');
const authenticate = require('../midleware/authenticate.js');

router.post('',authenticate, categoryController.createCategory);
// router.get('/category/restaurant/:id', categoryController.getRestaurantsCategory);

module.exports = router;
