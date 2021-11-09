const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
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
    attachments: [{ type: Object, required: true }],
    dueDatetime: { type: Date },
    points: { type: Number },
    submissions: { type: Array },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    course: { type: String, required: true },
    semester: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
