const database = require('../database/config');

function getExistingPet(userId, name) {
  const query = `
        SELECT id FROM Pets WHERE userId = '${userId}' AND name = '${name}'
    `;

  console.log('Running the following query: ' + query);
  return database.executar(query);
}

function create(name, picture, description, userId) {
  let query = 'INSERT INTO Pets (name, picture, description, userId) VALUES';

  query += ` ("${name}", `;

  if (picture) {
    query += `"${picture}", `;
  } else {
    query += `null, `;
  }

  if (description) {
    query += `"${description}", `;
  } else {
    query += `null, `;
  }

  query += `"${userId}");`;

  console.log('Running the following query: ' + query);
  return database.executar(query);
}

function listAll() {
  const query = `
        SELECT id, name, picture FROM Pets;
    `;

  console.log('Running the following query: ' + query);
  return database.executar(query);
}

function getById(id) {
  const query = `
        SELECT 
          tutor.id AS tutorId,
          tutor.username AS tutorName,
          pet.id, 
          pet.name, 
          pet.picture, 
          pet.description
            FROM Pets AS pet
              JOIN Users AS tutor
              ON pet.userId = tutor.id
                WHERE pet.id = ${id}
    `;

  console.log('Running the following query: ' + query);
  return database.executar(query);
}

function update(id, column, value) {
  const query = `
    UPDATE Pets SET ${column} = "${value}" WHERE id = ${id}
  `;

  console.log('Running the following query: ' + query);
  return database.executar(query);
}

module.exports = {
  create,
  getExistingPet,
  listAll,
  getById,
  update
};
