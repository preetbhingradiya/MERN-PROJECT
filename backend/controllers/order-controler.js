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

//update order --admin
const updateOrdedr=catchAsyncError(async(req,res,next)=>{
  const order=await Order.findById(req.params.id)

  if(!order) return next(new ErrorHendler("order not found this id",404))

  if(order.orderStatus==="Deliverd") return next(new ErrorHendler("Tou hve alredy order this product",400))

  order.orderItems.forEach(async(ele)=>{
    await updateStock(ele.product,ele.quantity)
  })

  order.orderStatus=req.body.status

  await order.save({validateBeforeSave:false})

  res.status(200).json({
    success:true,
  }) 
})

//delete order
const deleteOrder=catchAsyncError(async(req,res,next)=>{
  const order=await Order.findById(req.params.id)

  if(!order) return next(new ErrorHendler("order not found this id",404))

  await order.deleteOne()

  res.status(200).json({
      success:true,
  })
})

async function updateStock(id,quantity){
  let product=await Product.findById(id)

  product.stock-=quantity

  await product.save({validateBeforeSave:false})
}

module.exports = { createOrder ,singleUser, loginUser,updateOrdedr,deleteOrder};
