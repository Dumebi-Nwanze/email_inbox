CREATE DATABASE emailinbox;

CREATE TABLE users(
    uid SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);
CREATE TABLE emails(
    id SERIAL PRIMARY KEY,
    subject TEXT NOT NULL,
    body TEXT NOT NULL ,
    isRead BOOLEAN
);


SELECT * FROM users;

INSERT INTO users ( name, email, password) VALUES ('Dumebi', 'test123@gmail.com', 'test123');
INSERT INTO emails (subject, body, isRead) VALUES ('Hello', 'Hi there how are you today', false) RETURNING id;




