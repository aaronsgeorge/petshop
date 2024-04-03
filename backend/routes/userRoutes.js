import Express from "express";
const router = Express.Router();
import {
  authUser,
  logoutUser,
  registerUser,
} from "../controllers/userController.js";

router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.post("/register", registerUser);

export default router;
