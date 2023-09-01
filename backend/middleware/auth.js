const catchAsyncError = require("../middleware/asyncCatch");
const User = require("../model/user-model");
const ErrorHendler = require("../utils/errorhendler");
const jwt = require("jsonwebtoken");

const Auth = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token)
    return next(new ErrorHendler("Plase Login to access this resource", 401));

  const decodet = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodet.id);

  next();
});

const logoutUser = catchAsyncError(async (req, res) => {
  res.cookie("token", null, {
    expire: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "User Logout",
  });
});

const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHendler(
          `Role: ${req.user.role} is not allowed to access this resource`
        )
      );
    }
    next();
  };
};

module.exports = { Auth, logoutUser, authorizeRole };
