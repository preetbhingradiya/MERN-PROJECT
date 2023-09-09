const  Router  = require("express");
const { Auth, authorizeRole } = require("../middleware/auth");
const { createOrder, singleUser, loginUser, deleteOrder, updateOrdedr } = require("../controllers/order-controler");

const orderRoute=Router()

orderRoute.post('/new/order',Auth,createOrder)

orderRoute.get('/order/:id',Auth,authorizeRole("admin"),singleUser)

orderRoute.get("/myorder",Auth,loginUser)

orderRoute.patch("/update/order/:id",Auth,authorizeRole("admin"),updateOrdedr)

orderRoute.delete('/delete/order/:id',Auth,authorizeRole("admin"),deleteOrder)

module.exports=orderRoute