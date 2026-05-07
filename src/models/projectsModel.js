const database = require('../database/config');

function getExistingProject(title, githubUrl) {
  const query = `
        SELECT id FROM Projects WHERE title = '${title}' OR githubUrl = '${githubUrl}';
    `;

  console.log('Running the following query: ' + query);
  return database.executar(query);
}

function create(title, githubUrl, picture, description, userId) {
  let query = 'INSERT INTO Projects (title, githubUrl, picture, description,  fkUser) VALUES';

  query += ` ("${title}", `;
  query += `"${githubUrl}", `;

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
        SELECT id, title, picture FROM Projects;
    `;

  console.log('Running the following query: ' + query);
  return database.executar(query);
}

function getById(id) {
  const query = `
        SELECT p.fkUser, p.title AS projectTitle, p.githubUrl, p.picture, p.description, r.title AS reviewTitle, r.text AS reviewText, r.rating AS reviewRating FROM Projects AS p LEFT JOIN Reviews AS r ON r.projectId = p.id WHERE r.projectId = '${id}';
    `;

  console.log('Running the following query: ' + query);
  return database.executar(query);
}

function update(id, column, value) {
  const query = `
    UPDATE Projects SET ${column} = "${value}" WHERE id = ${id}
  `;

  console.log('Running the following query: ' + query);
  return database.executar(query);
}

module.exports = {
  create,
  getExistingProject,
  listAll,
  getById,
  update
};
