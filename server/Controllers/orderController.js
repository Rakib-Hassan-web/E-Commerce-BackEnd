const cartSchema = require("../models/cartSchema");
const Order = require("../models/orderSchema");
const { sendError, sendSuccess } = require("../services/responseHandler");


const checkOut = async (req, res) => {
  try {
    const { cartID, shippingAddress, payment,deliveryCost } = req.body;
    const OrderNum = `RHA-${Date.now()}`;

    if (!cartID) return sendError(res, "cartid is required", 400);
    if (!shippingAddress) return sendError(res, "shipping address is required", 400);
    if (!payment) return sendError(res, "payment information is required", 400);

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

      paymentMethod: payment.paymentMethod,

      totalPrice,
      OrderNum,
      deliveryCost: 120,
    });

    await orderData.save();

   
    await cartSchema.findByIdAndDelete(cartID);

    return sendSuccess(res, "order placed successfully", 200);

  } catch (error) {
    console.log(error);
    sendError(res, "internal server error", 500);
  }
};


module.exports = { checkOut };