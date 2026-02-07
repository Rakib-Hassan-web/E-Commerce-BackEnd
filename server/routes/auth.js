
const express =require('express')
const { RegisterUSer, verifyOTP, resendOTP, LoginUser } = require('../Controllers/authControllers')

const routee =express.Router()



routee.post("/registration" ,  RegisterUSer)
routee.post("/verifyotp" ,  verifyOTP)
routee.post("/resendotp" ,  resendOTP)
routee.post("/login" ,  LoginUser)


module.exports=routee