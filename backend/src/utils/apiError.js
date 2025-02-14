const ApiError = (res, message, statusCode=400) => {
    return res.status(statusCode).json({
        error: {
            message: message,
            statusCode: statusCode
        }
    });
};

module.exports = ApiError