const reviewsModel = require('../models/reviewsModel');

function create(req, res) {
  const { projectId, title, text, rating } = req.body;

  if (projectId == undefined) {
    res.status(400).send('projectId is required!');
  } else if (title == undefined) {
    res.status(400).send('title is required!');
  } else if (text == undefined) {
    res.status(400).send('text is required!');
  } else if (rating == undefined) {
    res.status(400).send('rating is required!');
  } else {
    reviewsModel
      .create(projectId, title, text, rating)
      .then(function (data) {
        res.status(201).send();
      })
      .catch(function (err) {
        console.log(err);
        console.log('\n Unexpected error to create review! Error: ', err.sqlMessage);
        res.status(500).json(err.sqlMessage);
      });
  }
}

module.exports = {
  create
};
