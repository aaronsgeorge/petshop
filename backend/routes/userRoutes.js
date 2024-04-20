import Express from "express";
const router = Express.Router();
import {
  authUser,
  logoutUser,
  registerUser,
  getUsers,
  updateUserProfile,
  updateUserPassword,
  deleteUser,
  getUserById,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.post("/register", registerUser);
router.get("/", protect, admin, getUsers);
router.put("/profile", protect, updateUserProfile);
router.put("/password", protect, updateUserPassword);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById);

export default router;
