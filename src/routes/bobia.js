const express = require('express');
const router = express.Router();

const bobiaController = require('../controllers/bobiaController');

router.post('/ask', function (req, res) {
  bobiaController.generateAnswer(req, res);
});

module.exports = router;
