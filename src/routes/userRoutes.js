import express from "express";
import userController from "../controllers/userController.js";
import tokenValidation from "../middlewares/tokenValidation.js";
import userIdValidation from "../middlewares/userIdValidation.js";

const router = express.Router();

router.get("/products", tokenValidation, userController.getAuthUserProducts);
router.get("/:id", tokenValidation, userIdValidation, userController.getById);

export default router;
