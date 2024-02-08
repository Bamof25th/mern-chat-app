import express from "express";
import MessageController from "../controllers/messages.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();
const messageController = new MessageController();

router.get("/:id", protectRoute, messageController.getMessages);
router.post("/send/:id", protectRoute, messageController.sendMessage);

export default router;
