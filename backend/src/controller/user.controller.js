const asyncHandler = require('../utils/asyncHandler')
const ApiError = require('../utils/apiError')
const ApiResponse = require('../utils/apiResponse')
const User = require('../model/user.model')
const jwt = require('jsonwebtoken')
const uploadOnCloudinary = require("../utils/cloudinary")
const cloudinary = require('cloudinary').v2
const fs = require('fs')

const generateAccessAndRefreshToken = async(userId) => {
    try {
        const user = await User.findById(userId)

        if (!user) {
            return ApiError(res, "User not found", 404)
        }

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})
        return {accessToken, refreshToken}
    } catch (error) {
        console.log(error);
        return ApiError(res, "Something went wrong when generating access token and refresh token", 500)
    }
}

const registerUser = asyncHandler(async (req, res) => {

    const {fullName, username, email, password} = req.body

    if (
        [fullName, username, email, password].some((field) =>{
            field?.trim() == ""
        })
    ) {
        return ApiError(res, "All fields are required",400)
    }

    const existedUser = await User.findOne({
        $or: [{email}, {username}]
    })

    if (existedUser) {
        return ApiError(res, "User with this email or username already existed", 409)
    }

    const user = await User.create({
        fullName,
        email,
        username,
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser) {
        return ApiError(res, "Something went wrong when registering user", 500)
    }

    res.status(201).json(
        new ApiResponse(200, createdUser, "User register Successfully")
    )
})

const loginUser = asyncHandler(async (req, res, next) => {
    // req.body => data
    // user or email
    // find the user
    // check the password
    // access and refresh token
    // send cookie

    const {emailUsername, password} = req.body
    if(!emailUsername) {
        return ApiError(res, "Email or username is required", 400)
    }

    const user = await User.findOne({
        $or: [{email: emailUsername}, {username: emailUsername}]
    })

    if(!user) {
        return ApiError(res, "User doesn't exists", 400)
    }

    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid) {
        return ApiError(res, "Incorrect password")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

    const loggedUser = await User.findById(user._id).select("-password -refreshToken")

    const option ={
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // Expires in 7 days
        path: '/', 
    }

    res.status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedUser, accessToken
            },
            "User logged in successfully",
            true
        )
    )
})

const logOut = asyncHandler(async (req, res) => {
    try {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    refreshToken: ""
                }
            },
            {
                new: true
            }
        )
    
        const option = {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        }
    
        res.status(200)
        .clearCookie("accessToken", option)
        .clearCookie("refreshToken", option)
        .json(
            new ApiResponse(200, {}, `User logged out`)
        )
    } catch (error) {
        return ApiError(res, "Couldn't logout", 400)
    }
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookie.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken) {
        return ApiError(res, "Unauthorized request", 401)
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id)

        if(!user) {
            return ApiError(res, "Invalid refresh Token", 401)
        }

        if(incomingRefreshToken !== user?.refreshToken) {
            return ApiError(res, "Refresh token is expired", 410)
        }

        const option = {
            httpOnly: true,
            secure: true
        }

        const {accessToken, newRefreshToken} = await generateAccessAndRefreshToken(user._id)

        res.status(200)
        .cookie("accessToken", accessToken, option)
        .cookie("refreshToken", newRefreshToken, option)
        .json(
            new ApiResponse(
                200,
                {accessToken, refreshToken:newRefreshToken},
                "Access token refresh"
            )
        )
    } catch (error) {
        return ApiError(res, "Invalid refresh token")
    }
})

const changePassword = asyncHandler(async(req, res) => {
    const {oldPassword, newPassword, confirmPassword} = req.body

    if(!oldPassword || !newPassword || !confirmPassword) {
        return ApiError(res, "Old password, new password and confirm password are required")
    }

    const user = await User.findById(req.user._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        return ApiError(res, "Incorrect password")
    }

    if(newPassword !== confirmPassword) {
        return ApiError(res, "New password and confirm password didn't match")
    }

    user.password = newPassword
    await user.save({validateBeforeSave: true})

    res.status(200).json(
        new ApiResponse(
            200, 
            {},
            "Password changes successfully"
        )
    )
})

const getCurrentUser = asyncHandler(async (req, res) => {
    res.status(200)
    .json(
        new ApiResponse(
            200,
            req.user,
            "User fetched successfully"
        )
    )
})

const uploadProfile = asyncHandler(async(req, res) => {
    try {
        const profilePicPath = req.file?.path
        if(!profilePicPath) {
            return ApiError(res, "Image not found")
        }

        const user = await User.findById(req.user._id)
        if(user.profilePic) {
            const publicId = user.profilePic.split("/").pop().split(".")[0]
            await cloudinary.uploader.destroy(publicId)
        }

        const profilePic = await uploadOnCloudinary(profilePicPath)
        if(!profilePic) {
            return ApiError(res, "Couldn't upload image")
        }

        const profilePicUrl = profilePic.secure_url

        user.profilePic = profilePicUrl
        await user.save()

        res.status(200)
        .json(new ApiResponse(200, profilePicUrl, "Image uploaded successfully"))
    } catch (error) {
        console.log("Error on uploadProfile controller", error);
        return ApiError(res, "Couldn't upload image")
    }
})



module.exports = {registerUser, loginUser, logOut, refreshAccessToken, changePassword, getCurrentUser, uploadProfile}