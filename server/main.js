const express = require('express')
const app = express()

app.use(express.json())




app.listen(8000, () => {
  console.log("Server is running on port 8000")
})


const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://E-commerceBackend:E-commerceBackend@cluster0.7ooynjm.mongodb.net/E-commerceBackend?appName=Cluster0')
  .then(() => console.log(' mongo db Connected!'));