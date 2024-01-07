const ErrorHandler = (err, req, res, next) => {
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Something went wrong';
    const errResponse = {
        error: {
            status: errStatus,
            message: errMsg,
            stack: process.env.NODE_ENV === 'development' ? err.stack : {}
        }
    };
    console.log('Error Found: ', errResponse);
    res.status(errStatus).json(errResponse);
}

module.exports = ErrorHandler;