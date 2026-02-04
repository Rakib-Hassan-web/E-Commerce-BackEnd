

const express =require('express')

const routee =express.Router()

const auth_route = require ('./auth.js')
const product_route = require ('./product.js')

routee.use('/auth' ,  auth_route)

routee.use('/product' ,  product_route)

routee.get ('/' ,(req,res)=>{
    res.send ('api is working')
})

module.exports=routee