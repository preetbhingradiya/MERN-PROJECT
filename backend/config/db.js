const mongoose=require("mongoose")

const connect = async()=>{
    await mongoose.connect(process.env.DATABASE)
    console.log("connect to the database");
}

module.exports=connect