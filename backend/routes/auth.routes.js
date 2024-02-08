import express from "express";
import AuthUser from "../controllers/auth.controller.js";

const router = express.Router();

const authUser = new AuthUser();

router.post("/signup", authUser.signUp);
router.post("/login", authUser.logIn);
router.post("/logout", authUser.logOut);

export default router;
