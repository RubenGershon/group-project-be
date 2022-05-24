import {
  createProduct,
  deleteProduct,
  findProduct,
} from "../queries/productQueries.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

async function addProduct(req, res) {
  const responseObj = await uploadImagesToCloudinary(req.files);

  const response = await createProduct({
    ...req.body,
    ...responseObj,
  });
  if (response.status !== "ok") {
    res.status(400).send(response);
    return;
  }

  res.status(201).send(response);
  return;
}

// Helper function
async function uploadImagesToCloudinary(filesArray) {
  const imagesUrls = [];
  const imagesPublicIds = [];
  const result = {};

  //Looping over the images and uploading them 1 by 1 to cloudinary
  for (const file of filesArray) {
    const uploadImg = await cloudinary.uploader.upload(file.path, {
      folder: "MyLockerGroupProject",
    });
    imagesUrls.push(uploadImg.secure_url);
    imagesPublicIds.push(uploadImg.public_id);

    //deleting the image from the local uploads folder
    uploadImg && fs.promises.unlink(file.path);
  }

  result.imagesUrls = imagesUrls;
  result.imagesPublicIds = imagesPublicIds;
  return result;
}

async function getProductById(req, res) {
  res.status(200).send({ status: "ok", data: req.product.toObject() });
}

async function deleteProductControl(req, res) {
  const product = req.product;
  for (let i = 0; i < product.imagesPublicIds.length; i++) {
    await cloudinary.uploader.destroy(product.imagesPublicIds[i]);
  }
  const response = await deleteProduct(req.product._id);
  if (response.status !== "ok") {
    res.status(400).send(response);
    return;
  }
  res.status(201).send(response);
  return;
}

async function searchProductController(req, res) {
  const query = await findProduct(req.query);
  if (query.status !== "ok") {
    res.status(400).send(query);
    return;
  }
  res.status(201).send(query);
  return;
}

async function editProductController(req, res) {
  const product = req.product;
  try {
    if ("title" in req.body) product.tiile = req.body.title;
    if ("price" in req.body) product.price = req.body.price;
    if ("material" in req.body) product.material = req.body.material;
    if ("condition" in req.body) product.condition = req.body.condition;
    if ("size" in req.body) product.size = req.body.size;
    if ("brand" in req.body) product.brand = req.body.brand;
    if ("type" in req.body) product.type.type = req.body.type;
    if ("subtype" in req.body) product.type.subtype = req.body.subtype;

    if (req.files) {
      try {
        for (let i = 0; i < product.imagesPublicIds.length; i++) {
          await cloudinary.uploader.destroy(product.imagesPublicIds[i]);
        }
      } catch (err) {}

      const uploadedImges = await uploadImagesToCloudinary(req.files)

      product.imagesUrls = uploadedImges.imagesUrls;
      product.imagesPublicIds = uploadedImges.imagesPublicIds;
    }

    await product.save();
    res.status(201).send({
      status: "ok",
      message: "product successfully updated",
    });
    return;
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error,
    });
    return;
  }
}

export default {
  addProduct,
  getProductById,
  deleteProductControl,
  editProductController,
  searchProductController,
};
