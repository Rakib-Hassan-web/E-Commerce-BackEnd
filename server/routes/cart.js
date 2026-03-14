const express = require('express')
const { AddToCart, getUserCart } = require('../Controllers/cartController')

const routee =express.Router()



routee.post("/add" ,AddToCart  )
routee.post("/userCart" ,getUserCart  )




module.exports = routee