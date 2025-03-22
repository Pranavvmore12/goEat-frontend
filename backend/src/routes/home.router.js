const express = require('express');
const router = express.Router();

// Example route for getting all items from MongoDB
router.get('/', async (req, res) => {
  res.status(200).send({message:"welcome to online food ordering website!"})
});

// Add more routes for CRUD operations (POST, PUT, DELETE) as needed

module.exports = router;
