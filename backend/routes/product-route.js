const  Router  = require("express");
const { getAllPrduct, createProduct, updateProduct, deleteProduct, createReview, getReview, deleteReview, getProductDetails } = require("../controllers/product-control");
const { Auth, authorizeRole } = require("../middleware/auth");

const product=Router()

product.get('/product',getAllPrduct)

product.get('/product/:id',getProductDetails)

product.post('/product/new',Auth, authorizeRole("admin") , createProduct)

product.patch('/product/:id',Auth, authorizeRole("admin") ,updateProduct)

product.delete('/product/:id',Auth, authorizeRole("admin") , deleteProduct)

product.put('/product/review',Auth,createReview)

product.get("/allreview",getReview)

product.delete("/delete/review",Auth,deleteReview)

module.exports=product