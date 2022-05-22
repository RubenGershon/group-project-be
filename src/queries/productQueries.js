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
  console.log({[parameter]: value})
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
  // const {type, title, price, material, id, size, brand} = query
  // if (type) {

  // }
  try {
    const products = await productModel.find(query)
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
