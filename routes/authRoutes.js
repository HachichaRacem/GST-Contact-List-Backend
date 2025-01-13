import { Router } from "express";
import { login, handleRedirect } from "../controllers/authController.js";

const router = Router();

router.get("/login", login);
router.get("/", handleRedirect);

export default router;
