import express from "express";
import multer from "multer";
import productController from "../controllers/productController.js";
import productIdValidation from "../middlewares/productIdValidation.js";
import tokenValidation from "../middlewares/tokenValidation.js";

const router = express.Router();
const upload = multer({ dest: process.env.UPLOAD_FOLDER + "/" });

// Add a new product, need to be authenticated
router.post(
  "/add",
  tokenValidation,
  upload.array("image"),
  productController.addProduct
);

// Search for a product, no need to be authenticated
router.get(
  "/search",
  productController.searchProductController
);

// router.get("/count", productController.getNumberOfProductsControl);

// Get a product based on it's id, need to be authenticated
router.get(
  "/:id",
  tokenValidation,
  productIdValidation,
  productController.getProductById
);

// Delete a product based on it's id, need to be authenticated
router.delete(
  "/:id",
  tokenValidation,
  productIdValidation,
  productController.deleteProductController
);


// Edit a product based on it's id, need to be authenticated
router.put(
  "/edit/:id",
  tokenValidation,
  productIdValidation,
  upload.array("image"),
  productController.editProductController
);


export default router;
