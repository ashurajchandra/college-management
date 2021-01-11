const mongoose = require("mongoose");
const assignmentsSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    Deadline: {
      type: Date,
      required: true,
    },
    evaluated: {
      type: Boolean,
      default: false,
    },
    Grade: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Assignment", assignmentsSchema);
