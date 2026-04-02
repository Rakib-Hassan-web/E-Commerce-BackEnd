const cartSchema = require("../models/cartSchema");
const Order = require("../models/orderSchema");
const { sendError, sendSuccess } = require("../services/responseHandler");
const stripe = require('stripe')(process.env.STRIPE_SEC);




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

    // -------------------

     const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            line_items: [
                {
                    price_data: {
                        currency: 'BDT',
                        product_data: {
                            name: 'T-Shirt',
                            description: `Blue T-Shirt with chest print`,
                        },
                        unit_amount: 300 * 100,
                    },
                    quantity: 1,
                }
            ],
            customer_email: `${req.user.email}`,
            success_url: `https://example.com/success`,
            cancel_url: `https://example.com/error`,
        });

        
        
        res.redirect(303, session.url);
        console.log(session);
        
   
 


  } catch (error) {
    console.log(error);
    sendError(res, "internal server error", 500);
  }

};


module.exports = { checkOut };