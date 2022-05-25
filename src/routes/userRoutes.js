import express from "express";
import userController from "../controllers/userController.js";
import tokenValidation from "../middlewares/tokenValidation.js";
import userIdValidation from "../middlewares/userIdValidation.js";

const router = express.Router();

router.get("/:id", tokenValidation, userIdValidation, userController.getById);
router.get("/products", tokenValidation, userIdValidation, userController.getAuthUserProducts);

export default router;
