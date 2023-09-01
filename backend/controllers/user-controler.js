const ErrorHendler = require("../utils/errorhendler");
const catchAsyncError = require("../middleware/asyncCatch");
const User = require("../model/user-model");
const bcrypt=require("bcryptjs");
const sendToken = require("../utils/jwtToken");

//register user

const registerUser = catchAsyncError(async (req, res, nexxt) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is sample id",
      url: "profileUrl",
    },
  });

  sendToken(user,201,res)
});

//login user
const loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  //chech email or password can be exit database ??
  if (!email || !password)
    return next(new ErrorHendler("Please enter Email & password", 400));

  const user = await User.findOne({ email }).select("+password");

  //inCorrect password or email
  if (!user)
    return next(new ErrorHendler("Please check Email Or Password", 401));

  const matchPassword=await bcrypt.compare(password,user.password)
  if(!matchPassword){
    return next(new ErrorHendler("please chack password or email",401))
  }

  sendToken(user,200,res)
});

module.exports = { registerUser, loginUser };
