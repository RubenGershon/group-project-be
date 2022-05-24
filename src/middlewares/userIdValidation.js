import { findUserById } from "../queries/userQueries.js";

async function productIdValidation(req, res, next) {
  const response = await findUserById(req.params.id);
  if (response.status === "ok") {
    req.user = response.data;
    next();
  } else res.status(400).send(response);
}

export default productIdValidation;
