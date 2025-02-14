const connectDB = require('./db/db')
const app = require('./app')
const dotenv = require("dotenv")

dotenv.config()

connectDB()
.then(() => {
    const PORT = process.env.PORT || 6000
    app.listen(PORT, () => {
        console.log(`⚙️  Server is running at port: ${PORT}`)
    })
})
.catch((err) => {
    console.log(`MONGO DB connection failed!!!, ${err}`);
})