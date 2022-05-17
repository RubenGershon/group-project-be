import express from "express";
import multer from "multer";
import productController from "../controllers/productController.js";
import productIdValidation from "../middlewares/productIdValidation.js";
import tokenValidation from "../middlewares/tokenValidation.js";

const router = express.Router();
const upload = multer({ dest: process.env.UPLOAD_FOLDER + "/" });

router.post(
  "/add",
  tokenValidation,
  upload.array("image"),
  productController.addProduct
);

router.get(
  "/:id",
  tokenValidation,
  productIdValidation,
  productController.getProductById
);

router.get("/search", (req, res) => res.send(typeof req.query.type));

export default router;
