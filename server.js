const express = require('express')
const dotenv = require('dotenv')

//Load Env vars
dotenv.config({
    path: './confg/config.env'
})

const app = express()

const PORT = process.env.PORT || 5000

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode ON PORT ${PORT}`)
)