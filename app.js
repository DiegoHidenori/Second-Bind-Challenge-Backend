const express = require('express');
const app = express();
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes');

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const loggerMiddleware = (req, res, next) => {
    console.log(`Request URL: ${req.originalUrl}`);
    next();
}

app.use(loggerMiddleware);

app.use('/api', bookRoutes);

module.exports = app;