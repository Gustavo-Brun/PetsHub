const express = require('express');
const router = express.Router();

const reviewsController = require('../controllers/reviewsController');

router.post('/create', function (req, res) {
  reviewsController.create(req, res);
});

router.get('/:petId', function (req, res) {
  reviewsController.getByPet(req, res);
});

module.exports = router;
