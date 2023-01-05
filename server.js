const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')

//ROUTE FILES
const connectDB = require('./confg/db')

//Load Env vars
dotenv.config({
    path: './confg/config.env'
})

//Connect to database
connectDB()

//ROUTE FILES
const bootcamps = require('./routes/bootcamps')

const app = express()

app.use(express.json())

// Dev Loggin moddleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

//Mount Routers
app.use('/api/v1/bootcamps', bootcamps)

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