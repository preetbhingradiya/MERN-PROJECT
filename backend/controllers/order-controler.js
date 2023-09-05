const catchAsyncError = require("../middleware/asyncCatch");
const Order = require("../model/order-model");
const Product = require("../model/product-model");
const ErrorHendler = require("../utils/errorhendler");

//create new order
const createOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order=await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt:Date.now(),
    user:req.user._id
  })

  res.status(201).json({
    success:true,
    order
  })
});

//get single user order
const singleUser=catchAsyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id)

    if(!order) return next(new ErrorHendler("Order does not found",404))

    res.status(200).json({
        success:true,
        order
    })
})

//get login user order
const loginUser=catchAsyncError(async(req,res,next)=>{
    const order=await Order.find({user:req.user.id})

    if(!order) return next(new ErrorHendler("user can not exit",404))

    res.status(200).json({
        success:true,
        order
    })
})

module.exports = { createOrder ,singleUser, loginUser};
