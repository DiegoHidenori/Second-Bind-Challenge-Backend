const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Book = sequelize.define('Book', {
    entry_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    publication_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    isbn: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'inventory',
    timestamps: false,
});

module.exports = Book;