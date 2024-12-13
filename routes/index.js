const express = require("express");
const regionsRoutes = require("./regionsRoutes");

const router = express.Router();

router.use("/regions", regionsRoutes);

module.exports = router;
