import { createProduct, deleteProduct, editProduct, findProduct } from "../queries/productQueries.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { equal } from "assert";

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
  res.status(200).send({ status: "ok", data: req.product });
}

async function deleteProductControl (req,res) {
  const query = await deleteProduct(req.params.id)
  if (query.status !== 'ok') {
    res.status(400).send(query);
    return;
  }
  res.status(201).send(query)
  return
}

async function searchProductController (req,res) {
  const query = await findProduct(req.query)
  if (query.status !== 'ok') {
    res.status(400).send(query);
    return;
  }
  res.status(201).send(query)
  return
}

async function editProductControl (req,res) {
  const query = await editProduct({id: req.params.id, parameter: req.body.parameter, value: req.body.value})
  if (query.status !== 'ok') {
    res.status(400).send(query);
    return;
  }
  res.status(201).send(query)
  return
}

export default {
  addProduct,
  getProductById,
  deleteProductControl,
  editProductControl,
  searchProductController
};
