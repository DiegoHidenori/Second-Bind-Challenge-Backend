const Book = require('../models/Book');
const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const { Op } = require('sequelize');

const getBooks = async (req, res) => {

    try {

        const books = await Book.findAll();
        res.status(200).json({ status: true, books });

    } catch (e) {

        res.status(500).json({ status: false, message: e.message });

    }

};

const createBook = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(400).json({ status: false, errors: errors.array() });

    }

    const { title, author, genre, publication_date, isbn } = req.body;

    const bookExists = await Book.findOne({ where: { isbn } });
    if (bookExists) {

        return res.status(400).json({ status: false, message: 'Book already exists' });

    }

    try {

        const book = await Book.create({ title, author, genre, publication_date, isbn });
        res.status(201).json({ status: true, book });

    } catch (e) {

        res.status(500).json({ status: false, message: e.message });

    }

};

const filterBooks = async (req, res) => {

    const { title, author, genre, publication_date } = req.query;
    const where = {};

    if (title) where.title = { [Op.iLike]: `%${title}%` };
    if (author) where.author = { [Op.iLike]: `%${author}%` };
    if (genre) where.genre = { [Op.iLike]: `%${genre}%` };
    if (publication_date) where.publication_date = publication_date

    try {

        const books = await Book.findAll({ where });

        res.status(200).json({ status: true, books });

    } catch (e) {
        
        res.status(500).json({ status: false, message: e.message });

    }

};

const exportBooks = async (req, res) => {

    try {

        const books = await Book.findAll();
        const jsonBooks = JSON.stringify(books, null, 4);

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', 'attachment; filename="books.json"');

        res.send(jsonBooks);

    } catch (e) {

        console.error('Error exporting books:', e.message);
        res.status(500).json({ status: false, message: e.message });
        
    }

}

module.exports = { getBooks, createBook, filterBooks, exportBooks };