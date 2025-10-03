import User from "../models/userModel.js";

class UserDAO {
  async create(userData) {
    const user = new User(userData);
    return await user.save();
  }

  async getById(id) {
    return await User.findById(id);
  }


  async getByName(){
    return await User.findByName();
  }

  async getByEmail(email) {
    return await User.findOne({ email });
  }

  async update(id, updateData) {
    return await User.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id) {
    return await User.findByIdAndDelete(id);
  }

  async listAll() {
    return await User.find();
  }
}

export default new UserDAO();
