import { Router } from "express";
import sidebarController from "../controllers/sidebar.controller.js";

const sideBarRoute = Router();

// CREATE
sideBarRoute.post("/create", sidebarController.createSidebar);

// READ ALL
sideBarRoute.get("/fetch/all", sidebarController.getAllSidebars);

// READ ONE
sideBarRoute.get("/:id", sidebarController.getSidebarById);

// UPDATE
sideBarRoute.put("/update/:id", sidebarController.updateSidebar);

// DELETE
sideBarRoute.delete("/delete/:id", sidebarController.deleteSidebar);

export default sideBarRoute;
