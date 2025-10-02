import express from 'express'
import cookieParser from 'cookie-parser'
import {config} from 'dotenv'
import morgan from 'morgan'
// import userRoutes from './route/user.routes.js'
// import errorMiddleware from './middlewares/error.middleware.js'
// import courseRouter from './route/course.routes.js'
import cors from 'cors'

import errorMiddleware from './middlewares/error.middleware.js'
import { connectRedis } from './redisClient.js'
import productRouter from './route/productRoute.js'
import userRouter from './route/user.route.js'
import sideBarRoute from './route/sidebar.route.js'
import { sendEmailController } from './bulk/emailController.js'


config()


const app=express()
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))


// Connect Redis before routes
await connectRedis();

app.use(cors({
   origin:[process.env.FRONTEND_URL],
   credentials:true
}))

app.use(morgan('dev'))


app.use('/api/v1/products', productRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/sidebar', sideBarRoute);

app.use('/api/v1/user',userRouter)
// app.use('/api/v1/courses',courseRouter)
// app.use('/api/v1/payements',payementRoutes)
// app.use('/api/v1/demo/video',demoRoute)

// app.use('/api/v1/admin/stats',stats)





app.use('/',(req,res)=>{
   res.status(200).json({
      message:"ka ho bab",
      "data":"don"
   })
})







app.all('*',(req,res)=>{
    res.status(404).send('OOPS!! 404 NOT FOUND')
})


app.use(errorMiddleware)

// app.all('*',(req,res)=>{
//    res.status(404).send('OPPS! 404 NOT FOUND')
// }) 

// 3 moduele


export default app