const express=require("express")
const product = require("./routes/product-route")
const errorMiddleware = require("./middleware/error")
const userRouter = require("./routes/user-route")
const app=express()

app.use(express.json())

app.use('/api/v1',product)
app.use('/api/v1',userRouter)

//middlewarw
app.use(errorMiddleware)

module.exports=app
