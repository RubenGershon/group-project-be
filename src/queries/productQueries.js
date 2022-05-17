import productModel from "../models/productModel.js";

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

export { createProduct, getProductById, deleteProduct };
