const app = require("./app");
const dotenv=require("dotenv");
const connect = require("./config/db");
const cloudinary=require('cloudinary')

dotenv.config({path:"backend/config/config.env"})

const store=app.listen(process.env.PORT,()=>{
    console.log(`server is running on PORT ${process.env.PORT}`);
    connect()
})

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})



//unhedled promise Rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error :${err.message}`);
    console.log("server is sutting down");

    store.close(()=>{
        process.exit(1)
    })
})