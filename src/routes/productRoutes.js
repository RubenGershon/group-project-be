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

router.delete('/:id',
  tokenValidation,
  productController.deleteProductControl
)

router.post('/edit/:id',
productController.editProductControl)

router.get(
  "/:id",
  tokenValidation,
  productIdValidation,
  productController.getProductById
);

router.get("/search/:key/:value", (req, res) => {res.send(req.params)});

export default router;
