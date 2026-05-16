const express = require('express');
const router = express.Router();

const reviewsController = require('../controllers/reviewsController');

router.post('/create', function (req, res) {
  reviewsController.create(req, res);
});

router.get('/listAll', function (req, res) {
  reviewsController.listAll(req, res);
});

router.get('/kpis', function (req, res) {
  reviewsController.getKpis(req, res);
});

module.exports = router;
