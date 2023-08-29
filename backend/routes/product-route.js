const  Router  = require("express");
const { getAllPrduct } = require("../controllers/product-control");

const product=Router()

product.get('/product',getAllPrduct)

module.exports=product