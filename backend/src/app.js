const express = require("express")
const app = express()
// const cors = require("cors")
const cookieParser = require('cookie-parser')

// app.use(cors({
//     origin: 'https://notetaker-client.vercel.app',
//     credentials: true,  // Allow credentials (cookies, etc.)
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
// }));

const cors = require('cors');
const corsOptions ={
    origin:'https://notetaker-client.vercel.app', 
    credentials:true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}
app.use(cors(corsOptions));

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))

const userRouter = require('./routes/user.routes')

app.use('/api/v1/user', userRouter)

module.exports = app