const express = require("express");
const router = express.Router();

router.use("/users", require("./user"));
router.use("/assignments", require("./assignment"));

module.exports = router;
