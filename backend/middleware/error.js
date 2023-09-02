const ErrorHendler = require("../utils/errorhendler");

const errorMiddleware = (err, req, res, next) => {
  err.statuscode = err.statuscode || 500;
  err.message = err.message || "Internal Server";

  if(err.name==="CastError"){
    const message='resource not found'
    err = new ErrorHendler(message, 400);
  }

  //wrogn Jwt error
  if (err.name === "JsonWebTokenError") {
    const message = `json web token is invalid,try agin `;
    err = new ErrorHendler(message, 400);
  }

  //JWT expire error
  if (err.name === "TokenExpireError") {
    const message = `json web token is Expire,try agin `;
    err = new ErrorHendler(message, 400);
  }

  res.status(err.statuscode).json({
    success: false,
    message: err.message,
  });
};
module.exports = errorMiddleware;
