const express = require('express')
const app = express()

app.use(express.json())




app.listen(8000, () => {
  console.log("Server is running on port 8000")
})


const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Connected!'));