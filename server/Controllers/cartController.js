const { sendError } = require("../services/responseHandler");

const AddToCart = async (req,res)=>{
    try {

        const {productId ,sku ,Quantity} = req.body;

        if(!productId || !sku || !Quantity) sendError(res ,"Invalid Request" ,400)
        if(!productId || !sku || !Quantity) sendError(res ,"Invalid Request" ,400)
        
    } catch (error) {
        
    }
}