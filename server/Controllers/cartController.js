const cartSchema = require("../models/cartSchema");
const productSchema = require("../models/productSchema");
const { sendError, sendSuccess } = require("../services/responseHandler");


// ------------add to cart------------
const AddToCart = async (req,res)=>{
    try {

        const {productId ,sku ,Quantity} = req.body;

        if(!productId || !sku || !Quantity) return sendError(res ,"Invalid Request" ,400)

        const product = await productSchema.findById(productId)

        if(!product) return sendError(res ,"Product not found" ,404)
 

        const ExistingCart = await cartSchema.findOne({user:req.user._id})

        const discounteAmount = (product.price * product.discountPercentage) / 100
        const discountedPrice = product.price - discounteAmount
        const subtotal = discountedPrice * Quantity
  

      if(ExistingCart){

        for(const item of ExistingCart.items){
            if(item.sku == sku){
                return sendError(res ,"Product Already exist in cart" ,400)
            }
        }

        ExistingCart.items.push({
                    product: productId,
                    sku,
                    Quantity,
                    subtotal
        })

        await ExistingCart.save()

        return sendSuccess(res ,"Product added to cart" ,200)
      }

   await cartSchema.create({
            user:req.user._id,
            items:[
                {
                    product: productId,
                    sku,
                    Quantity,
                    subtotal
                }
            ]
      })

      return sendSuccess(res ,"Product added to cart" ,200)
       
    } catch (error) {
     sendError(res ,"Server Error" ,500)
    }
}

// --------------get user cart ----------

const getUserCart = async( req,res)=>{

try {
        const Cart = await cartSchema.findOne({user:req.user._id})


    sendSuccess(res ,"",Cart ,200)
} catch (error) {
    sendError(res ,"Server Error" ,500)
}
    
    
}

// ----------------update cart ------------

const updateCart = async ( req , res)=>{
try {

    const {productId ,Quantity ,ItemId} =req.body

    if(Quantity<1) return sendError(res ,"Quantity must be more then 1" ,400)

    if(!productId || !Quantity || !ItemId) return sendError(res ,"Invalid Request" ,400)

        const Cart = await cartSchema.findOne({user:req.user._id ,})

    
} catch (error) {
    sendError(res ,"Server Error" ,500)
}
}


module.exports={AddToCart,getUserCart,updateCart}