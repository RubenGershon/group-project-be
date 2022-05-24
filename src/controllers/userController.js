async function getById(req, res) {
  res.status(200).send({
    status: "ok",
    data: req.user.toObject(),
  });
}

export default { getById };
