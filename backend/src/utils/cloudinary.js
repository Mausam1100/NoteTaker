const cloudinary = require('cloudinary').v2
const fs = require('fs')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

const uploadOnCloudinary = async(filename) => {
    try {
        if (!filename) return null
        const response = await cloudinary.uploader.upload(filename, {
            resource_type: "auto"
        })
        fs.unlinkSync(filename)
        return response
    } catch (error) {
        fs.unlinkSync(filename)
        console.log("Error in uploadOnCloudinary", error);
        return null
    }
}

module.exports = uploadOnCloudinary