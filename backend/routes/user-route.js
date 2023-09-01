const  Router  = require("express");
const { registerUser, loginUser } = require("../controllers/user-controler");
const { logoutUser } = require("../middleware/auth");

const userRouter=Router()

userRouter.post("/register",registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/logout',logoutUser)

module.exports=userRouter