DROP TABLE IF EXISTS Inventory;

CREATE TABLE IF NOT EXISTS Inventory (
    entry_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    genre VARCHAR(255) NOT NULL,
    publication_date DATE NOT NULL,
    isbn VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO Inventory (title, author, genre, publication_date, isbn) 
VALUES 
    ('The Great Gatsby', 'F. Scott Fitzgerald', 'Fiction', '1925-04-10', '9780743273565')
ON CONFLICT (isbn) DO NOTHING;