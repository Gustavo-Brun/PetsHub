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
            WHERE r.petId = ${petId}
  `;
  console.log('Running the following query: ' + query);
  return database.executar(query);
}

module.exports = {
  getExistingReview,
  create,
  getByPet
};
