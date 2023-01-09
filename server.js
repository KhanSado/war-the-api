const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const fileUpload = require('express-fileupload')
const errorHandler = require('./middleware/error')
const connectDB = require('./confg/db')

//Load Env vars
dotenv.config({path: './confg/config.env'})

//Connect to database
connectDB()

//ROUTE FILES
const bootcamps = require('./routes/bootcamps')
const courses = require('./routes/courses')
const auth = require('./routes/auth')

const app = express()

app.use(express.json())

// Dev Loggin moddleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

//File Uploading
app.use(fileUpload())

// set static folder
app.use(express.static(path.join(__dirname, 'public')))

//Mount Routers
app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)
app.use('/api/v1/auth', auth)


app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(
    PORT,
    console.log(`---------- Server running in ${process.env.NODE_ENV} mode ON PORT ${PORT}`.yellow.bold)
)

// Handler unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
    console.log(`---------- Error: ${err.message}`.red.bold);
    server.close(() => process.exit(1))
})