import UserModel from "../models/user.model.js";
import AppError from "../utils/error.utlis.js";
import bcrypt from "bcryptjs";
import { clearStoreCookie, generateAndStoreToken, verifyTokenFromRequest } from "../utils/tokenUtil.js";

const userService = {
    // Registration
    async createUser({ email, password }) {
        if (!email || !password) {
            throw new AppError("All fields are required", 400);
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            throw new AppError("Email already exists", 409);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await UserModel.create({
            email,
            password: hashedPassword,
        });

        return {
            id: user._id,
            email: user.email,
        };
    },

    // Login
    async loginUser({ email, password }) {
        if (!email || !password) {
            throw new AppError("All fields are required", 400);
        }

        const user = await UserModel.findOne({ email }).select("+password");
        if (!user) {
            throw new AppError("User not found, please register", 404);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new AppError("Invalid credentials", 401);
        }

        const token = await generateAndStoreToken(email);

        return {
            id: user._id,
            email: user.email,
            token,
        };
    },

    // isLogin check
    async isLoginUser(req) {
        try {
            const email = await verifyTokenFromRequest(req);
            return { email };
        } catch (error) {
            throw new AppError(error.message, 500)
        }

    },


    async logoutUser(res, req) {
        try {
            clearStoreCookie()
        } catch (error) {
            throw new AppError(error.message, 500)
        }
    }


};

export default userService;
