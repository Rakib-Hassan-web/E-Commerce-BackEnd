
const express =require('express')
const { RegisterUSer, verifyOTP } = require('../Controllers/authControllers')

const routee =express.Router()



routee.post("/registration" ,  RegisterUSer)
routee.post("/verifyotp" ,  verifyOTP)


module.exports=routee