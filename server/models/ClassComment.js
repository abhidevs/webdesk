const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    comment: { type: String, required: true },
    poster: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
