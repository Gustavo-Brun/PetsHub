const express = require('express');
const router = express.Router();
const upload = require('../config/configUpload');

const petsController = require('../controllers/petsController');

router.post('/create', upload.single('picture'), function (req, res) {
  petsController.create(req, res);
});

router.get('/listAll', function (req, res) {
  petsController.listAll(req, res);
});

router.get('/:petId', function (req, res) {
  petsController.getById(req, res);
});

router.patch('/:id', function (req, res) {
  petsController.update(req, res);
});

module.exports = router;
