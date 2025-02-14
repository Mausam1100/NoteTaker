const jwt = require('jsonwebtoken')
const asyncHandler = require('../utils/asyncHandler')
const User = require("../model/user.model")
const ApiError = require('../utils/apiError')

const verifyJWT = asyncHandler( async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.headers['authorization'].replace("Bearer ", "").slice(1, -1)
        if(!token) {
            return ApiError(res, "Unauthorized request")
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        if(!decodedToken) {
            return ApiError(res, "Access token didn't match", 400)
        }
        const user = await User.findById(decodedToken._id).select("-password -refreshToken")

        if (!user) {
            return ApiError(res, "Wrong access token")
        }
        
        req.user = user
        next()
    } catch (error) {
        console.log(error);
        return ApiError(res, "Invalid access token")
    }
})

module.exports = verifyJWT