import { Router } from "express";
import {
  getRegions,
  getRegionDetails,
} from "../controllers/regionsController.js";

const router = Router();

router.get("/", getRegions);
router.get("/:id", getRegionDetails);

export default router;
