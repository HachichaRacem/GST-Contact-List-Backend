const express = require("express");
const { getTerms } = require("../controllers/termController");

const router = express.Router();

router.get("/", getTerms);

module.exports = router;
