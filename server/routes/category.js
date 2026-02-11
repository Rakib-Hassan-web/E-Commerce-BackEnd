const express =require('express')
const { createNewCategory } = require('../Controllers/categoryController')

const routee =express.Router()




routee.get("/create" ,createNewCategory)


module.exports=routee