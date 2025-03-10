const {
    Schema,
    model
} = require("mongoose");

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
  
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
    },
    profilePic: {
        type: String,
        default: ""
    },
    refreshToken: {
        type: String
    }
}, {timestamps: true});

// harsh password before saving it
userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next()
})

// check if password is correct or not
userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)
}

//to generate accessToken
userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            fullName: this.fullName,
            username: this.username,
            email: this.email,
            createdAt: this.createdAt
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            // expiresIn: process.env.ACCESS_TOKEN_SECRET_EXPIRY
            expiresIn: 10
        }
    )
}

//to generate refreshToken
userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_SECRET_EXPIRY
        }
    )
}

const User = model("User", userSchema)
  
module.exports = User