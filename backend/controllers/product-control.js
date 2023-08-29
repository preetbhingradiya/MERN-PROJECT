const Product = require("../model/product-model")

//Get all product
const getAllPrduct=async(req,res)=>{
    const show=await Product.find()
    res.status(200).json({
        success:true,
        Message:show
    })
}

//create product
const createProduct=async(req,res)=>{
    const productDetaile=await Product.create(req.body)
    res.status(201).json({
        success:true,
        productDetaile
    })

}

//Updated Product
const updateProduct=async(req,res)=>{
    const update=await Product.findByIdAndUpdate(req.params.id,req.body)

    if(!update){
        return res.status(500).json({
            success:false,
            Message:"Product Not Found"
        })
    }
    res.status(200).json({
        success:true,
        update
    })
}

//delete product
const deleteProduct=async(req,res)=>{
    const remove=await Product.findByIdAndDelete(req.params.id)
    res.status(200).json({
        success:true,
        remove
    })
}

module.exports={getAllPrduct,createProduct,updateProduct,deleteProduct}