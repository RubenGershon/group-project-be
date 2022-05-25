async function getById(req, res) {
  res.status(200).send({
    status: "ok",
    data: req.user.toObject(),
  });
}

async function getAuthUserProducts(req, res) {
  
}

export default { getById, getAuthUserProducts };
