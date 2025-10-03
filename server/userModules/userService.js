import userDAO from "../dao/userDAO.js";

class UserService {
  async registerUser(userData) {
    const existingUser = await userDAO.getByEmail(userData.email);
    if (existingUser) throw new Error("Email already exists");
    return await userDAO.create(userData);
  }

  async getUser(id) {
    return await userDAO.getById(id);
  }

  async updateUser(id, data) {
    return await userDAO.update(id, data);
  }

  async deleteUser(id) {
    return await userDAO.delete(id);
  }

  async listUsers() {
    return await userDAO.listAll();
  }
}

export default new UserService();
