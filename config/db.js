const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DATABASE_URL,
    {
        // host: process.env.DATABASE_HOST || 'localhost',
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
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
