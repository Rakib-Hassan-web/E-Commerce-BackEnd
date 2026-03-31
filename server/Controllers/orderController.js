const cartSchema = require("../models/cartSchema")
const { sendError } = require("../services/responseHandler")

const checkOut = async(req ,res)=>{
  

    try {
        
       const {cartID} =req.body

       if(!cartID) return sendError(res,"cartid is required" ,400)

        const cartData = await cartSchema.findOne({_id:cartID})

        console.log(cartData);
        
    } catch (error) {
        sendError(res,"internal server error" ,500)
    }
}

module.exports ={ checkOut }