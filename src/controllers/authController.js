import authQueries from "../queries/authQueries.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function signUp(req, res) {
  const response = await authQueries.createUser(req.body);
  if (response.status !== "ok") {
    res.status(400).send(response);
    return;
  }

  res.status(201).send({
    status: "ok",
  });
  return;
}

async function login(req, res) {
  let userData = req.authUser;

  // Checking password, if password ok, create cookie with token inside
  // Creating token only with minimum unique data
  if (await bcrypt.compare(req.body.password, userData.password)) {
    const newobj = { _id: userData._id, email: userData.email };
    res.cookie("token", jwt.sign(newobj, process.env.JWT_SECRET), {
      httpOnly: true,
      sameSite: "lax",
    });

    userData.password = null
    res.status(200).send({
      status: "ok",
      data: {
        id: userData._id,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber: userData.phoneNumber,
      },
    });
  } else {
    userData = null;
    res.status(400).json({ status: "error", message: "invalid password" });
    return;
  }
}

async function logout(req, res) {
  res.clearCookie("token");
  res.status(200).send({
    status: "ok",
  });
}

export default { signUp, login, logout };
