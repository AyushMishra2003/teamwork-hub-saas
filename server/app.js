import express from 'express'
import cookieParser from 'cookie-parser'
import {config} from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import errorMiddleware from './middlewares/error.middleware.js'
import { connectRedis } from './redisClient.js'
import productRouter from './route/productRoute.js'
import userRouter from './route/user.route.js'
import sideBarRoute from './route/sidebar.route.js'
import { sendEmailController } from './bulk/emailController.js'
import {OAuth2Client} from 'google-auth-library'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import axios from 'axios'

// config()

dotenv.config()



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



let DB=[]


app.get("/db",async(req,res)=>{
   console.log("db is",DB);

   res.status(200).json({
     success:true,
     data:DB
   })
   
})


app.post("/signup", async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) return res.status(400).json({ message: "Token is required" });

    // 1️⃣ Fetch user info from Google using backend
    const googleUser = await axios
      .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((r) => r.data);


    console.log("Google user info:", googleUser);
    

    // 2️⃣ Check if user exists in DB
    let user = DB.find((u) => u.email === googleUser.email);
    if (!user) {
      // 3️⃣ Create new user
      user = {
        email: googleUser.email,
        firstName: googleUser.given_name,
        lastName: googleUser.family_name,
        picture: googleUser.picture,
        provider: "google",
        provider_id: googleUser.sub,
        password: null, // social login only
      };
      DB.push(user);
    }

    console.log("secret is","SECRET");
    

    // 4️⃣ Issue app JWT
    const appToken = jwt.sign({ email: user.email },"SECRET", {
      expiresIn: "1d",
    });

    res.json({ user: { ...user, token: appToken } });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid Google token" });
  }
});



app.post("/login", async (req, res) => {
  try {
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);
      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const profile = verificationResponse?.payload;

      const existsInDB = DB.find((person) => person?.email === profile?.email);

      if (!existsInDB) {
        return res.status(400).json({
          message: "You are not registered. Please sign up",
        });
      }

      res.status(201).json({
        message: "Login was successful",
        user: {
          firstName: profile?.given_name,
          lastName: profile?.family_name,
          picture: profile?.picture,
          email: profile?.email,
          token: jwt.sign({ email: profile?.email }, process.env.JWT_SECRET, {
            expiresIn: "1d",
          }),
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error?.message || error,
    });
  }
});



app.get('/',(req,res)=>{
   res.status(200).json({
      message:"ka ho bab",
      "data":"don"
   })
})







app.all('*',(req,res)=>{
    res.status(404).send('OOPS!! 404 NOT FOUND')
})

app.use(errorMiddleware)




export default app