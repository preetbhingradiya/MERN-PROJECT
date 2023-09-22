const express=require("express")
const product = require("./routes/product-route")
const errorMiddleware = require("./middleware/error")
const userRouter = require("./routes/user-route")
const cookie=require("cookie-parser")
const orderRoute = require("./routes/order-route")
const bodyParser=require("body-parser")
const fileUplod=require("express-fileupload")
const app=express()

app.use(express.json())
app.use(cookie())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUplod())

app.use('/api/v1',product)
app.use('/api/v1',userRouter)
app.use('/api/v1',orderRoute)

//middlewarw
app.use(errorMiddleware)

module.exports=app
