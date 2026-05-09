const petsModel = require('../models/petsModel');
const reviewsModel = require('../models/reviewsModel');

function create(req, res) {
  const { name, description, userId } = req.body;
  const picture = req.file?.filename;

  if (name == undefined) {
    res.status(400).send('name is required!');
  } else if (userId == undefined) {
    res.status(400).send('userId is required!');
  } else
    petsModel
      .getExistingPet(userId, name)
      .then(function (data) {
        if (data.length > 0) {
          return res.status(409).send('Pet already registered.');
        } else {
          petsModel
            .create(name, picture, description, userId)
            .then(function (data) {
              res.status(201).send();
            })
            .catch(function (err) {
              console.log(err);
              console.log('\n Unexpected error to create pet! Error: ', err.sqlMessage);
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

function listAll(req, res) {
  petsModel
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

function getById(req, res) {
  const { petId } = req.params;

  if (petId == undefined) {
    res.status(400).send('param petId is required!');
  }

  petsModel
    .getById(petId)
    .then(function (petData) {
      if (petData.length < 1) {
        return res.status(404).send('Pet not found.');
      }

      reviewsModel
        .getByPet(petId)
        .then(function (reviewsData) {
          let reviews = [];

          if (reviewsData.length >= 1) {
            reviews = reviewsData;
          }

          const pet = petData[0];

          const payload = {
            tutor: {
              id: pet.tutorId,
              name: pet.tutorName
            },
            pet: {
              id: pet.id,
              name: pet.name,
              picture: pet.picture,
              description: pet.description
            },
            reviews
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
      console.log('\n Unexpected error to get pet details! Error: ', err.sqlMessage);
      res.status(500).json(err.sqlMessage);
    });
}

function update(req, res) {
  const { id } = req.params;
  const { userId, column, value } = req.body;

  if (id == undefined) {
    res.status(400).send('param id is required!');
  }

  if (userId == undefined) {
    res.status(400).send('user id is required!');
  }

  petsModel
    .getById(id)
    .then(function (data) {
      if (data[0].userId !== Number(userId)) {
        res.status(403).send('Unauthorized user');
      } else {
        petsModel
          .update(id, column, value)
          .then(function (data) {
            res.status(200).send();
          })
          .catch(function (err) {
            console.log(err);
            console.log('\n Unexpected error to update this pet! Error: ', err.sqlMessage);
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

module.exports = {
  create,
  listAll,
  getById,
  update
};
