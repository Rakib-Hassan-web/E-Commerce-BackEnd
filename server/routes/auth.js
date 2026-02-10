
const express =require('express')
const { RegisterUSer, verifyOTP, resendOTP, LoginUser, forgetpass, GetUserProfile, updateUserProfile } = require('../Controllers/authControllers')
const authMiddleware = require('../middleware/authMiddleware')
const upload = require("../middleware/StorageMiddleware")

const routee =express.Router()



routee.post("/registration" ,  RegisterUSer)
routee.post("/verifyotp" ,  verifyOTP)
routee.post("/resendotp" ,  resendOTP)
routee.post("/login" ,LoginUser)
routee.post("/forgetpass" ,forgetpass)
routee.get("/getprofile",authMiddleware ,GetUserProfile)
routee.put("/updateprofile",authMiddleware ,upload.single("avatar"),updateUserProfile)


module.exports=routee