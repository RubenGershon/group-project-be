import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from './routes/productRoutes.js'


mongoose.connect(process.env.MONGOOSE_CREDS);

const app = new express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));


app.use("/auth", authRoutes);
app.use("/products", productRoutes)


app.listen(process.env.PORT, () => {
  console.log(`Group project app listening on port ${process.env.PORT}...`);
});
