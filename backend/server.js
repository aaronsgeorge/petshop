import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const port = process.env.PORT || 5000;

connectDB();

const app = express();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser middleware
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Api is running...");
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
