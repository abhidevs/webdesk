const mongoose = require("mongoose");

const DoubtSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    poster: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    votes: { type: Number, default: 0 },
    responses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Doubt" }],
    isResponse: { type: String, default: false },
    course: { type: String, required: true },
    semester: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doubt", DoubtSchema);
