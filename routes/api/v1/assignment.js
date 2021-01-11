const express = require("express");
const router = express.Router();
const passport = require("passport");

const assignmentController = require("../../../controllers/api/v1/assignments_controller");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  assignmentController.create
);
router.get(
  "/getAssignment",
  passport.authenticate("jwt", { session: false }),
  assignmentController.getAssignment
);
router.post(
  "/evaluateAssignment",
  passport.authenticate("jwt", { session: false }),
  assignmentController.evaluateAssignment
);
router.post(
  "/submitAssignment",
  passport.authenticate("jwt", { session: false }),
  assignmentController.submitAssignment
);

module.exports = router;
