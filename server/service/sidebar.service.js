import Sidebar from "../models/sidebar.model.js";
import AppError from "../utils/error.utlis.js";

const sidebarService = {
  // CREATE
  async createSidebar(data) {
    const sidebar = await Sidebar.create(data);
    return sidebar;
  },

  // READ ALL
  async getAllSidebars() {
    const sidebars = await Sidebar.find();

    
    return sidebars;
  },

  // READ ONE
  async getSidebarById(id) {
    const sidebar = await Sidebar.findById(id);
    if (!sidebar) throw new AppError("Sidebar not found", 404);
    return sidebar;
  },

  // UPDATE
  async updateSidebar(id, data) {
    const sidebar = await Sidebar.findByIdAndUpdate(id, data, { new: true });
    if (!sidebar) throw new AppError("Sidebar not found", 404);
    return sidebar;
  },

  // DELETE
  async deleteSidebar(id) {
    const sidebar = await Sidebar.findByIdAndDelete(id);
    if (!sidebar) throw new AppError("Sidebar not found", 404);
    return sidebar;
  },
};

export default sidebarService;