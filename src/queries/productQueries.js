import productModel from "../models/productModel.js";



async function createProduct (data) {
    try {
        const product = await productModel.create(data);
        if (product) {
          return { status: "ok", data: product.toObject() };
        } else {
          return { status: "error", message: "unknown" };
        }
      } catch (err) {
        console.log(err)
      }
}

export default {
    createProduct
}