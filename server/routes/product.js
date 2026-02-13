const express =require('express')
const { createNewProduct } = require('../Controllers/productController')

const routee =express.Router()


routee.post("/create" ,createNewProduct)


module.exports=routee