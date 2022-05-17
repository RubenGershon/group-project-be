import { getProductById } from "../queries/productQueries.js";

async function productIdValidation(req, res, next) {
    const response = await getProductById(req.params.id)
    if (response.status === "ok") {
      req.product = response.data;
      next();
    } else res.status(400).send(response);
}

export default productIdValidation