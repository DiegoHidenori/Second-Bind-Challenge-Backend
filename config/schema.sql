CREATE DATABASE second_bind_db;

\c second_bind_db;

CREATE TABLE Inventory (
    entry_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    genre VARCHAR(255) NOT NULL,
    publication_date DATE NOT NULL,
    isbn VARCHAR(255) NOT NULL,
)

INSERT INTO Inventory (title, author, genre, publication_date, isbn) 
VALUES 
    ('The Great Gatsby', 'F. Scott Fitzgerald', 'Fiction', '1925-04-10', '9780743273565');