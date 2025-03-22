const express = require('express');
const router = express.Router();
const ingredientsController = require('../controllers/ingredientsController');

router.post('/category', ingredientsController.createIngredientCategory);
router.post('', ingredientsController.createIngredient);
router.put('/:id/stoke', ingredientsController.updateStoke);
router.get('/restaurant/:id', ingredientsController.restaurantsIngredient);
router.get('/restaurant/:id/category', ingredientsController.restaurantsIngredientCategory);

module.exports = router;
