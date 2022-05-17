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
    price: {
      type: String,
      required: true,
      maxlength: 10,
    },
    type: {
      type: String,
      required: true,
      maxlength: 15,
    },
    material: {
      type: String,
      maxlength: 15,
    },
    size: {
      type: String,
      maxlength: 6,
    },
    brand: {
      type: String,
      maxlength: 15,
    },
    imagesUrls: [String],
    imagesPublicIds: [String],
  },
  { collection: "products" }
);

ProductSchema.plugin(uniqueArray);
ProductSchema.statics.deleteProduct = function (_id) {
    return this.deleteOne({_id: _id})
}

const productModel = mongoose.model("ProductSchema", ProductSchema);

export default productModel;
