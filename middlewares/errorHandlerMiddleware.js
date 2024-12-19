const errorHandlerMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    const errorObj = {
        status: 500,
        message: 'Something broke!',
        error: err.message
    };
    res.status(500).send(errorObj);
};

module.exports = errorHandlerMiddleware;