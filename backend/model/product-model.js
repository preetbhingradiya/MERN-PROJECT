const mongoose = require("mongoose");

const productSchema =new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Plase Enter Product Name"],
  },
  description: {
    type: String,
    required: [true, "Plase Enter Product description"],
  },
  price: {
    type: Number,
    required: [true, "Plase Enter Product Prize"],
    maxLength: [8, "price can't exceed 8 number"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      img: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Plase Enter Product category"],
  },
  stock: {
    type: Number,
    required: [true, "Plase Enter Product Stock"],
    maxLength: [4, "price can't exceed 8 number"],
    default:1
  },
  numOfReviews: {
    type: Number,
    default:0
  },
  reviews:[
    {
        name:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        comment:{
            type:String,
            required:true
        }
    }
  ],
  createdAt:{
    type:Date,
    default:Date.now()
  }
});

const Product=mongoose.model("Product",productSchema)

module.exports=Product
