import { findUserById } from "../queries/userQueries.js";
import { getProductById } from "../queries/productQueries.js";

async function getById(req, res) {
  res.status(200).send({
    status: "ok",
    data: req.user.toObject(),
  });
}

async function getAuthUserProducts(req, res) {
  const userModel = await findUserById(req.user._id);
  const products = [];
  for (let i = 0; i < userModel.data.productsIds.length; i++) {
    const response = await getProductById(userModel.data.productsIds[i]);
    products.push(response.data.toObject());
  }

  res.status(200).send({
    status: "ok",
    data: products,
  });
}

export default { getById, getAuthUserProducts };
