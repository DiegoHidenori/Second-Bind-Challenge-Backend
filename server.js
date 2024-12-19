require('dotenv').config();
const app = require('./app');
const { sequelize, initializeDatabase } = require('./config/db');

const PORT = process.env.PORT || 3000;

const startServer = async () => {

    try {

        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        await initializeDatabase();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (e) {

        console.error('Error starting server:', e.message);

    }
    
};

startServer();