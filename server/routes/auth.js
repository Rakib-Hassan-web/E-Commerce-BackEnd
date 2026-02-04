
const express =require('express')
const { RegisterUSer } = require('../Controllers/authControllers')

const routee =express.Router()



routee.post("/registration" ,  RegisterUSer)


module.exports=routee