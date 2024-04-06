import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const { name, price, description, countInStock, category, image } = req.body;

  const product = new Product({
    name,
    price,
    countInStock,
    category,
    description,
    image,
  });

  const createdProduct = await product.save();

  res.status(201).json(createdProduct);
});

export { getProducts, createProduct };
