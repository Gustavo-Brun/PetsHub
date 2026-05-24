const reviewsModel = require('../models/reviewsModel');

function create(req, res) {
  const { userId, petId, title, text, rating } = req.body;

  if (userId == undefined) {
    res.status(400).send('userId is required!');
  } else if (petId == undefined) {
    res.status(400).send('petId is required!');
  } else if (title == undefined) {
    res.status(400).send('title is required!');
  } else if (text == undefined) {
    res.status(400).send('text is required!');
  } else if (rating == undefined) {
    res.status(400).send('rating is required!');
  } else {
    reviewsModel
      .getExistingReview(userId, petId)
      .then(function (data) {
        if (data.length > 0) {
          return res.status(409).send('This user already reviewed this pet.');
        } else {
          reviewsModel
            .create(userId, petId, title, text, rating)
            .then(function (data) {
              res.status(201).send();
            })
            .catch(function (err) {
              console.log(err);
              console.log('\n Unexpected error to create review! Error: ', err.sqlMessage);
              res.status(500).json(err.sqlMessage);
            });
        }
      })
      .catch(function (err) {
        console.log(err);
        console.log('\n Unexpected error to find this pet! Error: ', err.sqlMessage);
        return res.status(500).json(err.sqlMessage);
      });
  }
}

function listAll(req, res) {
  reviewsModel
    .listAll()
    .then(function (data) {
      res.status(200).json(data);
    })
    .catch(function (err) {
      console.log(err);
      console.log('\n Unexpected error to list pets! Error: ', err.sqlMessage);
      res.status(500).json(err.sqlMessage);
    });
}

function getKpis(req, res) {
  reviewsModel
    .countMost()
    .then(function (mostData) {
      reviewsModel
        .countLess()
        .then(function (lessData) {
          reviewsModel
            .countReviews()
            .then(function (totalData) {
              const most = mostData[0];
              const less = lessData[0];
              const total = totalData[0];

              const payload = {
                total: {
                  rating1: total.totalReviews_1,
                  rating2: total.totalReviews_2,
                  rating3: total.totalReviews_3
                },
                most: {
                  petId: most.id,
                  petName: most.name,
                  totalReviews: most.totalReviews
                },
                less: {
                  petId: less.id,
                  petName: less.name,
                  totalReviews: less.totalReviews
                }
              };

              res.status(200).send(payload);
            })
            .catch(function (err) {
              console.log(err);
              console.log('\n Unexpected error to get pet reviews! Error: ', err.sqlMessage);
              res.status(500).json(err.sqlMessage);
            });
        })
        .catch(function (err) {
          console.log(err);
          console.log('\n Unexpected error to get pet reviews! Error: ', err.sqlMessage);
          res.status(500).json(err.sqlMessage);
        });
    })
    .catch(function (err) {
      console.log(err);
      console.log('\n Unexpected error to get pet details! Error: ', err.sqlMessage);
      res.status(500).json(err.sqlMessage);
    });
}

module.exports = {
  create,
  listAll,
  getKpis
};
