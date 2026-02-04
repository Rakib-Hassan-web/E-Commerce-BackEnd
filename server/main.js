const express = require('express')
const DATABASE_URL = require('./dB config')
const routee = require('./routes')
const app = express()
require('dotenv').config()
app.use(express.json())

DATABASE_URL()
app.use(routee)


app.listen(8000, () => {
  console.log("Server is running on port 8000")
})




