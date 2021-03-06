import mongoose from "mongoose";
import uniqueArray from "mongoose-unique-array";

const ProductSchema = new mongoose.Schema(
  {
    sellerId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    type: {
      type: String,
      default: "",
      maxlength: 100,
    },
    price: {
      type: Number,
      default: 0,
      required: true,
    },
    material: {
      type: String,
      default: "",
      maxlength: 20,
    },
    condition: {
      type: String,
      default: "",
      maxlength: 20,
    },
    size: {
      type: String,
      default: "",
      maxlength: 6,
    },
    brand: {
      type: String,
      default: "",
      maxlength: 30,
    },
    imagesUrls: [String],
    imagesPublicIds: [String],
  },
  { collection: "products" }
);

ProductSchema.plugin(uniqueArray);
ProductSchema.statics.deleteProduct = function (_id) {
  return this.deleteOne({ _id: _id });
};

const productModel = mongoose.model("ProductSchema", ProductSchema);

export default productModel;
