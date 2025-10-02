import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { sendEmailController } from "../bulk/emailController.js";




const userRouter=Router()

userRouter.post("/create",userController.createUser)
userRouter.get("/get",userController.getUser)
userRouter.post("/login",userController.loginUser)
userRouter.post("/isLogin",userController.isLoginUser)
userRouter.get("/logout",userController.logoutUser)
userRouter.get("/email",sendEmailController)

export default userRouter