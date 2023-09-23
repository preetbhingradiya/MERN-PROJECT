const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken')
const crypto=require("crypto")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your name"],
    maxLength: [30, "Name Can't exceed 30 character"],
    minLength: [4, "Name shoud hve more then 4 character"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your email"],
    unique: true,
    validate: [validator.isEmail, "Plase eneter valid detaile"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your password"],
    minLength: [8, "please enter password shoud be greater than 8 character"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt:{
    type:Date,
    default:Date.now(),
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//Bcrypt hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//Bcrypt Compare password
// userSchema.methods.comparePassword=async function(password){
//   return await bcrypt.compare(password,this.password)
// }

//JWT token
userSchema.methods.JwtToken=function(){
  return jwt.sign({id:this._id},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRE
  })
}


//Reset password
userSchema.methods.resetPassword=function(){
  //gentaring token
  const resetToken=crypto.randomBytes(20).toString("hex")

  this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex")

  this.resetPasswordExpire= Date.now() + 15*60*1000

  return resetToken
}

const User = mongoose.model("User", userSchema);

module.exports = User;
