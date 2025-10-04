import { validateUserLogin, validateUserRegistration } from "../validation/userValidation.js";
import userService from "./userService.js";


const userController = {
  async register(req, res) {
    try {
      const { error } = validateUserRegistration(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          errors: error.details.map((e) => e.message),
        });
      }

      const result = await userService.registerUser(req.body);
      res.status(201).json({ success: true, message: "User registered", data: result });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async login(req, res) {
    try {
      const { error } = validateUserLogin(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          errors: error.details.map((e) => e.message),
        });
      }

      const result = await userService.loginUser(req.body);
      res.status(200).json({ success: true, message: "Login successful", data: result });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json({ success: true, data: users });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async getUserById(req, res) {
    try {
      const user = await userService.getUserById(req.params.id);
      res.status(200).json({ success: true, data: user });
    } catch (err) {
      res.status(404).json({ success: false, message: err.message });
    }
  },

  async updateUser(req, res) {
    try {
      const updated = await userService.updateUser(req.params.id, req.body);
      res.status(200).json({ success: true, message: "User updated", data: updated });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async deleteUser(req, res) {
    try {
      const deleted = await userService.deleteUser(req.params.id);
      res.status(200).json({ success: true, message: "User deleted", data: deleted });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },
};

export default userController;
