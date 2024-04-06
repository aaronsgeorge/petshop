import Express from "express";
const router = Express.Router();
import {
  createProduct,
  getProducts,
} from "../controllers/productController.js";

router.get("/", getProducts);
router.post("/", createProduct);

export default router;
