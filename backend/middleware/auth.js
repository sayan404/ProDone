const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken');
const User = require('../models/userModel')
exports.isAuthenticUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("Please Login to Access resources", 401))
    }
    const decodeData = jwt.verify(token, "MyNameisSayanMajumdeRCSE25JALPAIGURIGOVTENGCOLG")
    req.user = await User.findById(decodeData.id)
    next();
})

exports.authorizedRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role : ${req.user.role} is not allowed to access this resource`, 403)
            )
        }
        next()
    }
}