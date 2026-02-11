require('dotenv').config()
const express = require('express')
const DATABASE_URL = require('./dB config')
const cookieParser = require('cookie-parser')
const routee = require('./routes')
const cloudinaryConfig = require('./services/cloudinaryConfig')


const app = express()
app.use(express.json())
app.use(cookieParser())

DATABASE_URL()
cloudinaryConfig()
app.use(routee)



app.listen(8000, () => {
  console.log("Server is running on port 8000")
})




