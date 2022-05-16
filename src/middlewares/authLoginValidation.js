import authQueries from "../queries/authQueries.js";

async function authLoginValidation(req, res, next) {
  const body = req.body;
  if (!body.email) {
    res.status(400).send({ status: "error", message: "email missing" });
    return;
  }

  if (!body.password) {
    res.status(400).send({ status: "error", message: "password missing" });
    return;
  }

  const response = await authQueries.findUser(body.email);
  if (response.status !== "ok") {
    res.status(404).send(response);
    return;
  }

  req.authUser = response;
  next();
}

export default authLoginValidation;
