import productModel from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";

async function createProduct(data) {
  try {
    const product = await productModel.create(data);
    if (product) {
      return { status: "ok", data: product.toObject() };
    } else {
      return { status: "error", message: "unknown" };
    }
  } catch (err) {
    return { status: "error", message: err };
  }
}

async function deleteProduct (id) {
  try {
   const product = await productModel.findById(id);
   if (product.imagesPublicIds.length > 0) {
    for (let i=0; i<product.imagesPublicIds.length; i++) {
      console.log(product.imagesPublicIds[i])
      await cloudinary.uploader.destroy(product.imagesPublicIds[i], function (result) {
        console.log(result)
      })
     }
   }

    const deleteProduct = await productModel.deleteProduct(id);
    if (deleteProduct) {
      return { status: "ok"};
    } else {
      return { status: "error", message: "unknown" };
    }
  }
  catch (err) {
    return { status: "error", message: err };
  }
}

async function editProduct ({id, parameter, value}) {
  try {
    const change = await productModel.findOneAndUpdate({_id: id}, {[parameter]: value})
    if (change) {
      return { status: "ok", data: change.toObject() };
    } else {
      return { status: "error", message: "unknown" };
    }
  }
  catch (err) {
    return { status: "error", message: err };
  }
}

async function getProductById(id) {
  try {
    const product = await productModel.findById(id);
    if (product) {
      return { status: "ok", data: product.toObject() };
    } else {
      return { status: "error", message: "unknown" };
    }
  } catch (err) {
    return { status: "error", message: err };
  }
}

async function findProduct (query) {
  const {type, title, price, material, id, size, brand} = query
  const queryObj = {}
  if (type) {
      queryObj['type.type'] = type.type;
      if (type.subtype) {
        queryObj['type.subtype'] = type.subtype
      }
  }
  console.log(title)
  if (title) {
    queryObj['title'] = {$regex: title, $options: 'i'}
  }
  if (price) {
    const priceArr = price.split(',')
    queryObj['price'] = {$gte: +priceArr[0], $lte: +priceArr[1]}
  }
  if (price) {
    queryObj['size'] = {$regex: size, $options: 'i'}
  }
  if (brand) {
    queryObj['brand'] = {$regex: brand, $options: 'i'}
  }
  if (material) {
    queryObj['material'] = {$regex: material, $options: 'i'}
  }
  console.log(queryObj)
  try {
    const products = await productModel.find(queryObj)
    if (products) {
      return { status: "ok", data: products.map(product => product.toObject()) };
    } else {
      return { status: "error", message: "unknown" };
    }
  }
  catch (err) {
    return { status: "error", message: err };
  }
}

export { createProduct, getProductById, deleteProduct, editProduct, findProduct };
