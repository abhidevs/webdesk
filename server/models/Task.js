const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    subjectId: { type: String, required: true },
    posterId: { type: String, required: true },
    timeOfPosting: { type: String, required: true },
    attachments: { type: Array },
    dueDatetime: { type: String },
    points: { type: Number },
    submissions: { type: Array },
    course: { type: String, required: true },
    semester: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
