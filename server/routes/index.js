

const express =require('express')

const routee =express.Router()

const authroute = require ('./auth.js')

routee.use('/auth' ,  authroute)

module.exports=routee