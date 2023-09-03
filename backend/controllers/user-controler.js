const ErrorHendler = require("../utils/errorhendler");
const catchAsyncError = require("../middleware/asyncCatch");
const User = require("../model/user-model");
const bcrypt = require("bcryptjs");
const sendToken = require("../utils/jwtToken");
const sendMaile = require("../utils/sendemail");
const crypto = require("crypto");

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

  sendToken(user, 201, res);
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

  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    return next(new ErrorHendler("please chack password or email", 401));
  }

  sendToken(user, 200, res);
});

//forgot passsword
const forgotPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return next(new ErrorHendler("User not founde", 404));

  const resetToken = user.resetPassword();
  await user.save({ validateBeforeSave: fasle });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl}`;

  try {
    await sendMaile({
      email: user.email,
      subject: "website password recover",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    //empty or undefined user schema key
    this.resetPasswordToken = undefined;
    this.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: fasle });
    return next(new ErrorHendler(error.message, 500));
  }
});

//reset password
const resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) return next(new ErrorHendler("Reset password is invalid", 404));

  if (req.body.password !== req.body.comfirmpassword) {
    return next(new ErrorHendler("password not match", 404));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

//get find user
const userDetaile = catchAsyncError(async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

//Update Password 
const updatePassword = catchAsyncError(async (req, res,next) => {
  const {password}=req.body
  const user = await User.findById(req.user.id).select("+password")

  
  const matchPassword = await bcrypt.compare(password, user.password);
  console.log(matchPassword);
  
  if(!matchPassword) return next(new ErrorHendler("Old password incorrect ",400))

  if(req.body.newpassword !== req.body.confirmpassword) return next(new ErrorHendler("password does not match"))

  user.password=req.body.newpassword

  await user.save()

  sendToken(user,200,res)
});

//Update Profile
const updateProfile=catchAsyncError(async(req,res,next)=>{
  const newData={
    name:req.body.name,
    email:req.body.email
  }

  const updatProfile=await User.findByIdAndUpdate(req.user.id,newData,{
    new:true,
    runValidators:true,
    useFindAndModify:false
  })

  res.status(200).json({
    success:true,
    updatProfile
  })

})

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  userDetaile,
  updatePassword,
  updateProfile
};
