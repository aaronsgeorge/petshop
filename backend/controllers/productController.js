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
  const {
    name,
    price,
    description,
    countInStock,
    category,
    image,
    isPublished,
    isOnSale,
    salePrice,
    isPopular,
  } = req.body;

  const product = new Product({
    name,
    price,
    countInStock,
    category,
    description,
    image,
    isPublished,
    isOnSale,
    salePrice,
    isPopular,
  });

  const createdProduct = await product.save();

  res.send({
    message: "Product created successfully",
    product: createdProduct,
  });
});

// @desc    Fetch a single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    countInStock,
    category,
    image,
    isPublished,
    isOnSale,
    salePrice,
    isPopular,
  } = req.body;

  const product =
    (await Product.findById(req.params.id)) ||
    new Product({
      _id: req.params.id,
    });

  product.name = name;
  product.price = price;
  product.description = description;
  product.countInStock = countInStock;
  product.category = category;
  product.image = image;
  product.isPublished = isPublished;
  product.isOnSale = isOnSale;
  product.salePrice = salePrice;
  product.isPopular = isPopular;

  const updatedProduct = await product.save();

  res.send({
    message: "Product updated successfully",
    product: updatedProduct,
  });
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: req.params.id });
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
