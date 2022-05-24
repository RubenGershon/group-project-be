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

async function deleteProduct(id) {
  try {
    const deleteProduct = await productModel.deleteProduct(id);
    if (deleteProduct) {
      return { status: "ok" };
    } else {
      return { status: "error", message: "unknown" };
    }
  } catch (err) {
    return { status: "error", message: err };
  }
}

async function getProductById(id) {
  try {
    const product = await productModel.findById(id);
    if (product) {
      return { status: "ok", data: product };
    } else {
      return { status: "error", message: "unknown" };
    }
  } catch (err) {
    return { status: "error", message: err };
  }
}

async function findProduct(query) {
  const { type, title, price, material, id, size, brand, condition } = query;
  const queryObj = {};
  if (type) {
    queryObj["type.type"] = type.type;
    if (type.subtype) {
      queryObj["type.subtype"] = type.subtype;
    }
  }
  if (title) {
    queryObj["title"] = { $regex: title, $options: "i" };
  }
  if (price) {
    const priceArr = price.split(",");
    queryObj["price"] = { $gte: +priceArr[0], $lte: +priceArr[1] };
  }
  if (size) {
    queryObj["size"] = { $regex: size, $options: "i" };
  }
  if (brand) {
    queryObj["brand"] = { $regex: brand, $options: "i" };
  }
  if (material) {
    queryObj["material"] = { $regex: material, $options: "i" };
  }
  if (condition) {
    queryObj["condition"] = { $regex: condition, $options: "i" };
  }
  try {
    const products = await productModel.find(queryObj);
    if (products) {
      return {
        status: "ok",
        data: products.map((product) => product.toObject()),
      };
    } else {
      return { status: "error", message: "unknown" };
    }
  } catch (err) {
    return { status: "error", message: err };
  }
}

export { createProduct, getProductById, deleteProduct, findProduct };
