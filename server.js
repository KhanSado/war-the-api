const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')
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
const user = require('./routes/users')
const reviews = require('./routes/reviews')

const app = express()

app.use(express.json())

//cookie parser
app.use(cookieParser())

// Dev Loggin moddleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

//File Uploading
app.use(fileUpload())

//Sanitize data
app.use(mongoSanitize())

//Set Security headers
app.use(helmet())

//Prevent XSS attack
app.use(xss())

// set static folder
app.use(express.static(path.join(__dirname, 'public')))

//Mount Routers
app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)
app.use('/api/v1/auth', auth)
app.use('/api/v1/user', user)
app.use('/api/v1/review', reviews)

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