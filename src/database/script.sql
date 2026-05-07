CREATE DATABASE ProjectsHub;

USE ProjectsHub;

CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(20) NOT NULL
);

CREATE TABLE Projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(20) UNIQUE NOT NULL,
    githubUrl VARCHAR(255) UNIQUE NOT NULL,
    picture VARCHAR(255) UNIQUE,
    description VARCHAR(45),
    fkUser INT UNIQUE NOT NULL,
    CONSTRAINT fk_projects_user FOREIGN KEY(fkUser)
        REFERENCES Users(id)
);

CREATE TABLE Reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(20) NOT NULL,
    text VARCHAR(255) NOT NULL,
    rating INT NOT NULL,
    CHECK (rating >= 0 AND rating <= 5),
    projectId INT NOT NULL,
    CONSTRAINT fk_reviews_project FOREIGN KEY(projectId) 
        REFERENCES Projects(id),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);