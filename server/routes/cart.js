const express = require('express')
const { AddToCart, getUserCart, updateCart } = require('../Controllers/cartController')

const routee =express.Router()



routee.post("/add" ,AddToCart  )
routee.post("/usercart" ,getUserCart  )
routee.put("/update" ,updateCart  )




module.exports = routee