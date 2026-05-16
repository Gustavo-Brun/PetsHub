const database = require('../database/config');

function getExistingReview(userId, petId) {
  const query = `
        SELECT userId FROM Reviews WHERE userId = '${userId}' AND petId = '${petId}'
    `;

  console.log('Running the following query: ' + query);
  return database.executar(query);
}

function create(userId, petId, title, text, rating) {
  const query = `
        INSERT INTO Reviews (userId, petId, title, text, rating) VALUES ('${userId}', '${petId}', '${title}', '${text}', '${rating}');
    `;

  console.log('Running the following query: ' + query);
  return database.executar(query);
}

function getByPet(petId) {
  const query = `
    SELECT 
      r.petId,
      r.title AS reviewTitle, 
      r.text AS reviewText,
      r.rating AS reviewRating,
      u.username AS reviewUser
        FROM Reviews AS r    
          JOIN Users AS u
          ON r.userId = u.id
            WHERE r.petId = ${petId};
  `;

  console.log('Running the following query: ' + query);
  return database.executar(query);
}

function countAll() {
  const query = `
    SELECT COUNT(petId) AS totalReviews FROM Reviews;
  `;

  console.log('Running the following query: ' + query);
  return database.executar(query);
}

function listAll() {
  const query = `
        SELECT userId, petId, createdAt FROM Reviews ORDER BY createdAt ASC;
    `;

  console.log('Running the following query: ' + query);
  return database.executar(query);
}

function countMost() {
  const query = `
    SELECT 
      p.id,
      p.name,
      COUNT(r.petId) AS totalReviews
        From Pets AS p
          JOIN Reviews AS r
          ON r.petId = p.id
            GROUP BY p.id, p.name
              ORDER BY totalReviews DESC
                LIMIT 1

  `;
  console.log('Running the following query: ' + query);
  return database.executar(query);
}

function countLess() {
  const query = `
    SELECT 
      p.id,
      p.name,
      COUNT(r.petId) AS totalReviews
        From Pets AS p
          LEFT JOIN Reviews AS r
          ON r.petId = p.id
           GROUP BY p.id, p.name
              ORDER BY totalReviews ASC
                LIMIT 1

  `;
  console.log('Running the following query: ' + query);
  return database.executar(query);
}

module.exports = {
  getExistingReview,
  create,
  getByPet,
  listAll,
  countAll,
  countMost,
  countLess
};
