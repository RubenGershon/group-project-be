import { createProduct } from "../queries/productQueries.js";
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

export default {
  addProduct,
};
