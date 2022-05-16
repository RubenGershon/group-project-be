function tokenValidation(req, res, next) {
  try {
    const authenticatedUser = jwt.verify(
      req.cookies.token,
      process.env.JWT_SECRET
    );
    req.user = authenticatedUser;
    next();
  } catch (err) {
    return res.status(401).send({
      status: "error",
      message: "Invalid or missing token",
    });
  }
}

export default tokenValidation;
