const cartSchema = require("../models/cartSchema");
const orderSchema = require("../models/orderSchema");
const Order = require("../models/orderSchema");
const { sendError, sendSuccess } = require("../services/responseHandler");
const stripe = require('stripe')(process.env.STRIPE_SEC);
const endpointSecret = `${"whsec_tmVDtOCIrOmwat6Jbd26wF6TgcZUFs23"}`;



// --------------ckeckout-----------------------
const checkOut = async (req, res) => {
  try {
    const { cartID, shippingAddress, paymentMethod } = req.body;
    const OrderNum = `RHA-${Date.now()}`;

    if (!cartID) return sendError(res, "cartid is required", 400);
    if (!shippingAddress) return sendError(res, "shipping address is required", 400);
    if (!paymentMethod) return sendError(res, "payment information is required", 400);

    const cartData = await cartSchema.findById(cartID);
    if (!cartData) return sendError(res, "cart not found", 404);


    const totalPrice = cartData.items.reduce((total, item) => {
      return total += item.subtotal;
    }, 0);

    
    const orderData = new Order({
      user: req.user._id,
      orderItems: cartData.items,

      shippingAddress: {
        fullName: shippingAddress.fullName,
        address: shippingAddress.address,
        phone: shippingAddress.phone ,
      },
      paymentMethod: paymentMethod,
      totalPrice,
      OrderNum,
      deliveryCost: 120,
    });

    await orderData.save();

   
    await cartSchema.findByIdAndDelete(cartID);

       if(paymentMethod =="COD"){
       
      return sendSuccess(res, "order placed successfully", 200);
    }


const session = await stripe.checkout.sessions.create({
  mode: 'payment',

  line_items: [
    {
      price_data: {
        currency: 'bdt',
        product_data: {
          name: 'T-Shirt',
          description: `Blue T-Shirt with chest print`,
        },
        unit_amount: 300 * 100,
      },
      quantity: 1,
    }
  ],

  customer_email: req.user.email,

  success_url: `https://example.com/success`,
  cancel_url: `https://example.com/error`,

 
   metadata: {
    orderId: orderData._id.toString(), 
   },
  });


        res.redirect(303, session.url);
        console.log(session);


  } catch (error) {
    console.log(error);
    sendError(res, "internal server error", 500);
  }

};


// --------------weebhook-------------------

const webhook = async (req, res) => {
  const signature = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body, 
      signature,
      endpointSecret
    );

 
  } catch (err) {
    return sendError(res, `Webhook Error: ${err.message}`, 400);

  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      if (!session.metadata?.orderId) {
        return sendError(res, "No orderId found", 400);
        
      }

      const updatedOrder = await Order.findByIdAndUpdate(
        session.metadata.orderId,
        {
          "payment.status": "paid",
        },
        { new: true }
      );

    
    } catch (error) {
      return sendError(res, `Webhook Error: ${error.message}`, 400);
    }
  }


  sendSuccess(res,"webhook received" ,200)
  console.log("event received" ,event);
  
};



module.exports = { checkOut ,webhook};