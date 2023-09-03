const  Router  = require("express");
const { registerUser, loginUser, forgotPassword, resetPassword, userDetaile, updatePassword, updateProfile } = require("../controllers/user-controler");
const { logoutUser, Auth } = require("../middleware/auth");

const userRouter=Router()

userRouter.post("/register",registerUser)

userRouter.post('/login',loginUser)

userRouter.post('/password/forgot',forgotPassword)

userRouter.patch('/password/reset/:token',resetPassword)

userRouter.get('/me',Auth,userDetaile)  //cheack only login user

userRouter.patch("/password/update",Auth,updatePassword)

userRouter.patch('/me/profile',Auth,updateProfile)

userRouter.get('/logout',logoutUser)


module.exports=userRouter