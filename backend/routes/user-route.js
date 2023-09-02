const  Router  = require("express");
const { registerUser, loginUser, forgotPassword, resetPassword } = require("../controllers/user-controler");
const { logoutUser } = require("../middleware/auth");

const userRouter=Router()

userRouter.post("/register",registerUser)

userRouter.post('/login',loginUser)

userRouter.post('/password/forgot',forgotPassword)

userRouter.patch('/password/reset/:token',resetPassword)


userRouter.get('/logout',logoutUser)

module.exports=userRouter