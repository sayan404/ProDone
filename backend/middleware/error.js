const ErrorHandler = require('../utils/errorHandler')
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal Server Error"

    // Wrong Mongodb ID error
    if (err.name === "CastError") {
        const message = `Resourse not found. Invalid: ${err.path}`
        err = new ErrorHandler(message, 400)
    }
    // Mongoose duplicate key error
    if (err.code === 11000) {
        const message = new ErrorHandler(`Duplicate ${Object.keys(err.keyValue)} Entered`)
        err = new ErrorHandler(message, 400)
    }
    // wrong JWT error
    if (err.code === "JsonwebTokenError") {
        const message = new ErrorHandler(`JSON Web Token is Invalid,Try Again`)
        err = new ErrorHandler(message, 400)
    }
    
    // JET expire error
    if (err.code === "TokenExpireError") {
        const message = new ErrorHandler(`JSON Web Token is Expired,Try Again`)
        err = new ErrorHandler(message, 400)
    }

    res.status(err.statusCode).json({
        success: false,
        error: err.message,
    })
}


