import express from "express";
import UserController from "../controllers/user.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

const userController = new UserController();

router.get("/",protectRoute, userController.getUserForSidebar);

export default router;
