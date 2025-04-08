import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

// App config

const app=express()  // use express
const port=process.env.PORT || 4000  // add port number
connectDB()
connectCloudinary()
// middlewares

app.use(express.json()) // convert datas in json
app.use(cors()) // access another ip adresses

// api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get('/',(req,res)=>{
     res.send("api working"); // endpoint api
})

app.listen(port,()=>console.log('server started on port:'+port) //start express server
)