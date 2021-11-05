const mongoose = require("mongoose");

const DoubtSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    subjectId: { type: String, required: true },
    posterId: { type: String, required: true },
    timeOfPosting: { type: String, required: true },
    votes: { type: Number, default: 0 },
    responses: { type: Array },
    isResponse: { type: String, default: false },
    course: { type: String, required: true },
    semester: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doubt", DoubtSchema);
