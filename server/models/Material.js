const mongoose = require("mongoose");

const MaterialSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    subjectId: { type: String, required: true },
    posterId: { type: String, required: true },
    attachments: { type: Array, required: true },
    course: { type: String, required: true },
    semester: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Material", MaterialSchema);
