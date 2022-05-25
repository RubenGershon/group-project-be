import userModel from "../models/userModel.js";

async function findUserById(id) {
  try {
    const user = await userModel.findById(id, {
      _id: 1,
      firstName: 1,
      lastName: 1,
      role: 1,
      email: 1,
      phoneNumber: 1,
      productsIds: 1,
    });
    if (user) {
      return { status: "ok", data: user };
    } else {
      return { status: "error", message: "user not found" };
    }
  } catch (error) {
    return { status: "error", message: error };
  }
}

export { findUserById };
