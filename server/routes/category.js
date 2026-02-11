const express =require('express')
const { createNewCategory } = require('../Controllers/categoryController')
const routee =express.Router()
const multer  = require('multer')
const upload = multer()




routee.post("/create" ,upload.single("thumbnail"),createNewCategory)


module.exports=routee