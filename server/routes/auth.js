
const express =require('express')
const { RegisterUSer, verifyOTP, resendOTP, LoginUser } = require('../Controllers/authControllers')
const authMiddleware = require('../middleware/authMiddleware')

const routee =express.Router()



routee.post("/registration" ,  RegisterUSer)
routee.post("/verifyotp" ,  verifyOTP)
routee.post("/resendotp" ,  resendOTP)
routee.post("/login" ,authMiddleware,LoginUser)


module.exports=routee