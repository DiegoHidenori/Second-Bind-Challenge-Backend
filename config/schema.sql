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
    ('The Great Gatsby', 'F. Scott Fitzgerald', 'Fiction', '1925-04-10', '9780743273565'),
    ('To Kill a Mockingbird', 'Harper Lee', 'Fiction', '1960-07-11', '9780446310789'),
    ('1984', 'George Orwell', 'Dystopian', '1949-06-08', '9780451524935'),
    ('Pride and Prejudice', 'Jane Austen', 'Romance', '1813-01-28', '9781853260509'),
    ('The Lord of the Rings', 'J.R.R. Tolkien', 'Fantasy', '1954-07-29', '9780261102385'),
    ('The Catcher in the Rye', 'J.D. Salinger', 'Coming-of-age', '1951-07-16', '9780316769174')
ON CONFLICT (isbn) DO NOTHING;