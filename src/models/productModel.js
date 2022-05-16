import mongoose from "mongoose";

const sellerInfo = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        maxlength: 50
    },
    phoneNumber: {
        type: String,
        maxlength: 10
    },
    firstName: {
        type: String,
        required: true,
        maxlength: 50,
      },
      lastName: {
        type: String,
        maxlength: 50,
      }
},
{ collection: "products" })

const productSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
        maxlength: 100
    },
    price: {
        type: String,
        required: true,
        maxlength: 10
    },
    type: {
        type: String,
        required: true,
        maxlength: 15
    },
    material: {
        type: String,
        maxlength: 15
    },
    image: [{
        type: String
    }],
    sellerInfo: sellerInfo, //make required
    size: {
        type: String,
        maxlength: 6
    },
    brand: {
        type: String,
        maxlength: 15
    }

},
{ collection: "products" })

const productModel = mongoose.model("productSchema", productSchema);

export default productModel