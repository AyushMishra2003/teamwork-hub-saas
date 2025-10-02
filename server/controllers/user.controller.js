import UserModel from "../models/user.model.js";
import AppError from "../utils/error.utlis.js";
import userService from "../service/userService.js";
import { clearStoreCookie } from "../utils/tokenUtil.js";

const userController = {
    // Register
    async createUser(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.createUser({ email, password });

            res.status(201).json({
                success: true,
                message: "User created successfully",
                data: userData,
            });
        } catch (error) {
            return next(new AppError(error.message, error.statusCode || 500));
        }
    },

    // Login
    async loginUser(req, res, next) {
        try {
            const { email, password } = req.body;
            const result = await userService.loginUser({ email, password });

            // Set token cookie
            res.cookie("token", result.token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000, // 1 day
            });

            res.status(200).json({
                success: true,
                message: "User logged in successfully",
                data: { id: result.id, email: result.email },
            });
        } catch (error) {
            return next(new AppError(error.message, error.statusCode || 500));
        }
    },

    // Get all users
    async getUser(req, res, next) {
        try {
            const allUsers = await UserModel.find({}, "-password").lean();
            if (!allUsers.length) {
                return next(new AppError("No users found", 404));
            }

            res.status(200).json({
                success: true,
                message: "Users fetched successfully",
                data: allUsers,
            });
        } catch (error) {
            return next(new AppError(error.message, 500));
        }
    },

    // Check login
    async isLoginUser(req, res, next) {
        try {
            const result = await userService.isLoginUser(req);

            res.status(200).json({
                success: true,
                message: "User is logged in",
                data: result,
            });
        } catch (error) {
            return next(new AppError(error.message, error.statusCode || 500));
        }
    },


    async logoutUser(req, res, next) {
        try {
            // Call this if it does something useful (but DO NOT assign it to res)
            clearStoreCookie(req);

            res.clearCookie("token", {
                path: "/",
                httpOnly: true,
                secure: false,
                sameSite: "lax",
            });

            return res.status(200).json({
                success: true,
                message: "Logout Successfully",
            });
        } catch (error) {
            return next(new AppError(error.message, 500));
        }
    }


};

export default userController;
