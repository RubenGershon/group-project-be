

export default async function queryConverter (req,res,next) {
    const {type, title, price, material, id, size, brand} = req.query
try {
    const queryObj = {}
    if (type) {
      const typeArr = type.split(',')
      if (type[1]) {
        queryObj.type = {type: typeArr[0], subtype: typeArr[1] }
      }
    }
    req.query = queryObj
    next()
}
catch (err) {
    res.send(err)
}
}