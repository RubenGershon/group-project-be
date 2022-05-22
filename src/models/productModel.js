import mongoose from "mongoose";
import uniqueArray from "mongoose-unique-array";


const typeSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    maxlength: 20
  },
  subtype: {
    type: String,
    maxlength: 20
  }
})

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
      type: Number,
      required: true,

    },
    type: typeSchema,
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
