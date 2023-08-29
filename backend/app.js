const express=require("express")
const product = require("./routes/product-route")
const errorMiddleware = require("./middleware/error")
const app=express()

app.use(express.json())

app.use('/api/v1',product)

//middlewarw
app.use(errorMiddleware)

module.exports=app
