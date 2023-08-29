const  Router  = require("express");
const { getAllPrduct, createProduct, updateProduct, deleteProduct } = require("../controllers/product-control");

const product=Router()

product.get('/product',getAllPrduct)
product.post('/product/new',createProduct)
product.patch('/product/:id',updateProduct)
product.delete('/product/:id',deleteProduct)

module.exports=product