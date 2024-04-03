import Express from "express";
const router = Express.Router();
import {
  authUser,
  logoutUser,
  registerUser,
  getUsers,
} from "../controllers/userController.js";

router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.post("/register", registerUser);
router.get("/", getUsers);

export default router;
