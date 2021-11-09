const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    course: { type: String, required: true },
    semester: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", SubjectSchema);
