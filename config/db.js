const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST || 'localhost',
        dialect: 'postgres',
    }
);

const initializeDatabase = async () => {
    try {

        await sequelize.sync({ alter: true });
        console.log('Database models synchronized.');

    } catch (e) {

        console.error('Error synchronizing models:', e.message);
        
    }
};

module.exports = { sequelize, initializeDatabase };
