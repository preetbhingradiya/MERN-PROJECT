const sendToken = (user, statscode, res) => {
  const token = user.JwtToken();

  //option for cookie
  const options = {
    expire: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statscode).cookie("token",token,options).json({
    success:true,
    user,
    token
  })
};

module.exports=sendToken