const express = require('express')
const { AddToCart } = require('../Controllers/cartController')
const authMiddleware = require('../middleware/authMiddleware')
const routee =express.Router()



routee.post("/add" ,authMiddleware ,AddToCart  )




module.exports = routee