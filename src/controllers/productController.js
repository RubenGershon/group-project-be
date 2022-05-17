import { createProduct } from "../queries/productQueries.js";


async function addProduct(req, res) {
    const response = await createProduct(req.body);
    if (response.status !== "ok") {
      res.status(400).send(response);
      return;
    }
  
    res.status(201).send({
      status: "ok",
    });
    return;
  }

  export default {
      addProduct
  }