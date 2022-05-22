

export default async function queryConverter (req,res,next) {
    const {type} = req.query
try {
    if (type) {
      const typeArr = type.split(',')
      if (type[1]) {
        req.query.type = {type: typeArr[0], subtype: typeArr[1] }
      }
      else res.query.type = {type: typeArr[0]}
    }
    next()
}
catch (err) {
    res.send(err)
}
}