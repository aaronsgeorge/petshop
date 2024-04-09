import Express from "express";
const router = Express.Router();
import {
  createProduct,
  getProducts,
  getProductById,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.get("/:id", getProductById);

export default router;
