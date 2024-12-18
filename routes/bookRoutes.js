const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { getBooks, createBook, filterBooks, exportBooks} = require('../controllers/bookController');

router.get('/books', getBooks);

router.post('/books',  
    [

        body('title').notEmpty().withMessage('Title is required'),
        body('author').notEmpty().withMessage('Author is required'),
        body('genre').notEmpty().withMessage('Genre is required'),
        body('publication_date').notEmpty().withMessage('Publication date is required'),
        body('isbn').notEmpty().withMessage('ISBN is required'),

    ], 
createBook);

router.get('/books/filter', filterBooks);

router.get('/books/export', exportBooks);

module.exports = router;