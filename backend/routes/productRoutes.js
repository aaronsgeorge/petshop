import Express from "express";
const router = Express.Router();
import {
  createProduct,
  getProducts,
  getProductById,
} from "../controllers/productController.js";

router.get("/", getProducts);
router.post("/", createProduct);
router.get("/:id", getProductById);


export default router;
