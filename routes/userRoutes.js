import { Router } from "express";
import {
  getUserData,
  updateUserAlternateEmail,
  updateUserPhone,
  updateUserCountryCode,
} from "../controllers/userController.js";

const router = Router();

router.post("/", getUserData);
router.post("/update/altemail", updateUserAlternateEmail);
router.post("/update/phone", updateUserPhone);
router.post("/update/countrycode", updateUserCountryCode);

export default router;
