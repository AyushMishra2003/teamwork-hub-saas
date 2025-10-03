import userService from "../services/userService.js";

class UserController {
  async register(req, res) {
    try {
      const user = await userService.registerUser(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getUser(req, res) {
    try {
      const user = await userService.getUser(req.params.id);
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async updateUser(req, res) {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      res.json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async deleteUser(req, res) {
    try {
      await userService.deleteUser(req.params.id);
      res.json({ message: "User deleted" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async listUsers(req, res) {
    try {
      const users = await userService.listUsers();
      res.json(users);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

export default new UserController();
