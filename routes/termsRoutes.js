import { Router } from "express";
import { getTerms } from "../controllers/termController.js";

const router = Router();

router.get("/", getTerms);

export default router;
