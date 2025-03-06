const express = require("express")
const app = express()
const cors = require("cors")
const cookieParser = require('cookie-parser')

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, 
}));

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))

const userRouter = require('./routes/user.routes')

app.use('/api/v1/user', userRouter)

module.exports = app