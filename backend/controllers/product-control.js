const catchAsyncError = require("../middleware/asyncCatch");
const Product = require("../model/product-model");
const ErrorHendler = require("../utils/errorhendler");
const ApiFeatures = require("../utils/featurse");

//Get all product
const getAllPrduct = async (req, res) => {
  let resultPage = 5;
  const productCount=await Product.countDocuments()

  const API = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPage);
  const show = await API.qurey;
  res.status(200).json({
    success: true,
    show,
    productCount
  });
};

//create product
const createProduct = catchAsyncError(async (req, res) => {

  req.body.user=req.user.id

  const productDetaile = await Product.create(req.body);
  res.status(201).json({
    success: true,
    productDetaile,
  });
});

//Updated Product
const updateProduct = catchAsyncError(async (req, res, next) => {
  const update = await Product.findByIdAndUpdate(req.params.id, req.body);

  if (!update) {
    return next(new ErrorHendler("Product Not Found", 404));
  }

  res.status(200).json({
    success: true,
    update,
  });
});

//delete product
const deleteProduct = catchAsyncError(async (req, res, next) => {
  let remove = await Product.findById(req.params.id);

  if (!remove) {
    return next(new ErrorHendler("Product Not Found", 404));
  }

  remove = await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    remove,
  });
});

module.exports = { getAllPrduct, createProduct, updateProduct, deleteProduct };
