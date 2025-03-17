import Express from "express";
const router = Express.Router();
import {
  addOrderItems,
  getMyOrders,
  getOrdersByUserId,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(addOrderItems).get(getOrders);
router.route("/mine").get(getMyOrders);
router.route("/user/:id").get(getOrdersByUserId);
router.route("/:id").get(getOrderById);
router.route("/:id/pay").put(updateOrderToPaid);
router.route("/:id/deliver").put(updateOrderToDelivered);

export default router;
