

const mongoose = require('mongoose');
const express = require('express')

const routees =express.Router()

const DATABASE_URL =()=>{
    return mongoose.connect('mongodb+srv://E-commerceBackend:' + process.env.DB_PASS + '@cluster0.7ooynjm.mongodb.net/E-commerceBackend?appName=Cluster0')
    .then(() => console.log(' mongo db Connected!'));
}


module.exports= DATABASE_URL