import { Router } from "express";
import { getUserData, updateUser } from "../controllers/userController.js";

const router = Router();

router.post("/", getUserData);
router.post("/update/:id", updateUser);

export default router;
