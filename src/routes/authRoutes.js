import express from "express";
import authController from "../controllers/authController.js";
import authLoginValidation from "../middlewares/authLoginValidation.js";

const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/login", authLoginValidation, authController.login);
router.post("/logout", authController.logout);

export default router;
