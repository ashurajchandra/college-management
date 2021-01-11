const mongoose = require("mongoose");
const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    role: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    assignments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assignment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", usersSchema);
