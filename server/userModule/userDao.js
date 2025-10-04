import User from './userModel.js'

class UserDAO {
  async createUser(userData) {
    try {
      const user = await User.create(userData);
      return user;
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  async getAllUsers() {
    try {
      return await User.find().select("-password");
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }

  async getUserById(id) {
    try {
      const user = await User.findById(id).select("-password");
      return user;
    } catch (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  }

  async getUserByEmail(email) {
    try {
      return await User.findOne({ email });
    } catch (error) {
      throw new Error(`Error fetching user by email: ${error.message}`);
    }
  }

  async updateUser(id, data) {
    try {
      const updatedUser = await User.findByIdAndUpdate(id, data, {
        new: true,
      }).select("-password");
      return updatedUser;
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  async deleteUser(id) {
    try {
      return await User.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }
}

export default new UserDAO();
