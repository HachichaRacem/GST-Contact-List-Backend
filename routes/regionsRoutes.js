const express = require("express");
const {
  getRegions,
  getRegionDetails,
} = require("../controllers/regionsController");

const router = express.Router();

router.get("/", getRegions);
router.get("/:id", getRegionDetails);

module.exports = router;
