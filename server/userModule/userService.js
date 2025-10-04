import userDAO from "./userDao.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userService = {
  async registerUser(data) {
    const existingUser = await userDAO.getUserByEmail(data.email);
    if (existingUser) {
      throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await userDAO.createUser({
      ...data,
      password: hashedPassword,
    });

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  },

  async loginUser({ email, password }) {
    const user = await userDAO.getUserByEmail(email);
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "7d" }
    );

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    };
  },

  async getAllUsers() {
    return await userDAO.getAllUsers();
  },

  async getUserById(id) {
    const user = await userDAO.getUserById(id);
    if (!user) throw new Error("User not found");
    return user;
  },

  async updateUser(id, data) {
    const user = await userDAO.updateUser(id, data);
    if (!user) throw new Error("User not found or not updated");
    return user;
  },

  async deleteUser(id) {
    const deleted = await userDAO.deleteUser(id);
    if (!deleted) throw new Error("User not found or already deleted");
    return deleted;
  },
};

export default userService;
