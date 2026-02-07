
const express =require('express')
const { RegisterUSer, verifyOTP, resendOTP } = require('../Controllers/authControllers')

const routee =express.Router()



routee.post("/registration" ,  RegisterUSer)
routee.post("/verifyotp" ,  verifyOTP)
routee.post("/resendotp" ,  resendOTP)


module.exports=routee