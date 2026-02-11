const express =require('express')
const { createNewCategory } = require('../Controllers/categoryController')
const routee =express.Router()
const multer  = require('multer')
const authMiddleware = require('../middleware/authMiddleware')
const roleCheckMiddleware = require('../middleware/roleCheckMiddleware')
const upload = multer()




routee.post("/create" ,authMiddleware,  roleCheckMiddleware("admin"), upload.single("thumbnail"),createNewCategory)


module.exports=routee