import Express from "express";
const router = Express.Router();
import { authUser, logoutUser } from "../controllers/userController.js";

router.post("/auth", authUser);
router.post("/logout", logoutUser);

export default router;