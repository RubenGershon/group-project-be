import express from "express";
import productController from "../queries/productQueries.js";



const router = express.Router();


router.post("/add", productController.createProduct );
router.get("/search", (req,res) => res.send(typeof(req.query.type)))


export default router;