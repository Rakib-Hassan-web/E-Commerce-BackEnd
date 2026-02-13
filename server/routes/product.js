const express =require('express')
const { createNewProduct } = require('../Controllers/productController')
const multer = require('multer')
const authMiddleware = require('../middleware/authMiddleware')
const { roleCheckMiddleware } = require('../middleware/roleCheckMiddleware')

const routee =express.Router()
const uplode = multer()


routee.post("/create" ,authMiddleware, roleCheckMiddleware('admin'),uplode.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'images', maxCount: 4 }]),createNewProduct)


module.exports=routee