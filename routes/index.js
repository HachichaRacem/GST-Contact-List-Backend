const express = require("express");
const regionsRoutes = require("./regionsRoutes");
const termsRoutes = require("./termsRoutes");

const router = express.Router();

router.use("/regions", regionsRoutes);
router.use("/terms", termsRoutes);

module.exports = router;
