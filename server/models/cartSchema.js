 const mongoose =require("mongoose")


const cartItems = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product",
        required:true
    },
    sku:{
    type:String,
    required:true

    },
    Quantity:{
        type:String,
        required:true,
        min:1,
        default:1
    },
    subtotal:{
          type:String,
          required:true
    }
})



 const CartSchema = new mongoose.Schema({
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true,
      unique:true
    },
    items:[],
    totalproducts:{
        type:Number,
        default:0
    },
    totalprice:{
       type:Number,
        default:0 
    }
 } ,{timestamps:true})


module.exports = mongoose.model("cart" ,CartSchema)

