const  Router  = require("express");
const { Auth, authorizeRole } = require("../middleware/auth");
const { createOrder, singleUser, loginUser } = require("../controllers/order-controler");

const orderRoute=Router()

orderRoute.post('/new/order',Auth,createOrder)

orderRoute.get('/order/:id',Auth,authorizeRole("admin"),singleUser)

orderRoute.get("/myorder",Auth,loginUser)

module.exports=orderRoute