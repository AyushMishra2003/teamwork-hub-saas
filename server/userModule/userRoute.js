import  { Router } from "express";
import userController from "./userController";
import { verifyToken } from "../middlewares/authMiddleware"; 

const router = Router();

// Public Routes
router.post("/register", userController.register);
router.post("/login", userController.login);

// Protected Routes
router.get("/", verifyToken, userController.getAllUsers);
router.get("/:id", verifyToken, userController.getUserById);
router.put("/:id", verifyToken, userController.updateUser);
router.delete("/:id", verifyToken, userController.deleteUser);

export default router;
