const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    day: { type: String, required: true },
    time: { type: String, required: true },
    course: { type: String, required: true },
    semester: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Schedule", ScheduleSchema);
