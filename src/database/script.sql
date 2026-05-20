CREATE DATABASE PetsHub;

USE PetsHub;

CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(20) NOT NULL
);

CREATE TABLE Pets (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    picture VARCHAR(255) UNIQUE,
    description VARCHAR(45),
    userId INT NOT NULL,

    CONSTRAINT un_userId_name UNIQUE(userId, name),
    CONSTRAINT fk_pet_user FOREIGN KEY(userId)
        REFERENCES Users(id)
);

CREATE TABLE Reviews (
    userId INT NOT NULL,
    petId INT NOT NULL,
    title VARCHAR(20) NOT NULL,
    text VARCHAR(255) NOT NULL,
    rating INT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    CHECK (rating >= 1 AND rating <= 3),
    CONSTRAINT pk_reviews PRIMARY KEY(userId, petId),
    CONSTRAINT fk_review_user FOREIGN KEY(userId) 
        REFERENCES Users(id),
    CONSTRAINT fk_review_pet FOREIGN KEY(petId) 
        REFERENCES Pets(id)
);