
// Sidebar Controller - Full CRUD

import AppError from "../utils/error.utlis.js";
import sidebarService from "../service/sidebar.service.js";
import sidebarModel from "../models/sidebar.model.js";
import { buildUrls } from "../utils/sidebar.utlis.js";

const sidebarController = {
  async createSidebar(req, res, next) {
    try {
      const sidebarData = req.body;
      const { slug } = req.body;

      const result = await sidebarModel.findOne({ slug });
      if (result) return next(new AppError("Duplicate slug value", 404));

      const finalData = buildUrls(sidebarData); // 👈 Build URLs recursively

      const createdSidebar = await sidebarService.createSidebar(finalData);
      res.status(201).json({ success: true, data: createdSidebar });
    } catch (error) {
      next(error);
    }
  },



  async getAllSidebars(req, res, next) {
    try {
      
      const sidebars = await sidebarService.getAllSidebars();
      res.status(200).json({ success: true, data: sidebars });
    } catch (error) {
      next(error);
    }
  },

  async getSidebarById(req, res, next) {
    try {
      const { id } = req.params;
      const sidebar = await sidebarService.getSidebarById(id);
      res.status(200).json({ success: true, data: sidebar });
    } catch (error) {
      next(error);
    }
  },

  async updateSidebar(req, res, next) {
    try {
      const { id } = req.params;
      const sidebarData = req.body;
      const updatedSidebar = await sidebarService.updateSidebar(id, sidebarData);
      res.status(200).json({ success: true, data: updatedSidebar });
    } catch (error) {
      next(error);
    }
  },

  async deleteSidebar(req, res, next) {
    try {
      const { id } = req.params;
      await sidebarService.deleteSidebar(id);
      res.status(200).json({ success: true, message: "Sidebar deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
};

export default sidebarController;
