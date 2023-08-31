const app = require("./app");
const dotenv=require("dotenv");
const connect = require("./config/db");

dotenv.config({path:"backend/config/config.env"})

const store=app.listen(process.env.PORT,()=>{
    console.log(`server is running on PORT ${process.env.PORT}`);
    connect()
})


//unhedled promise Rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error :${err.message}`);
    console.log("server is sutting down");

    store.close(()=>{
        process.exit(1)
    })
})