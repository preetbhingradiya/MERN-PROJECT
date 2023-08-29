const catchAsyncError = require("../middleware/asyncCatch")
const Product = require("../model/product-model")
const ErrorHendler = require("../utils/errorhendler")

//Get all product
const getAllPrduct=async(req,res)=>{
    const show=await Product.find()
    res.status(200).json({
        success:true,
        Message:show
    })
}

//create product
const createProduct= catchAsyncError( async(req,res)=>{
    const productDetaile=await Product.create(req.body)
    res.status(201).json({
        success:true,
        productDetaile
    })
});

//Updated Product
const updateProduct=async(req,res,next)=>{
    const update=await Product.findByIdAndUpdate(req.params.id,req.body)

    if(!update){
        return next(new ErrorHendler("Product Not Found",404))
    }

    res.status(200).json({
        success:true,
        update
    })
}

//delete product
const deleteProduct=async(req,res,next)=>{

    let remove=await Product.findById(req.params.id)

    if(!remove){
        return next(new ErrorHendler("Product Not Found",404))
    }

    remove=await Product.findByIdAndDelete(req.params.id)
    res.status(200).json({
        success:true,
        remove
    })
}

module.exports={getAllPrduct,createProduct,updateProduct,deleteProduct}