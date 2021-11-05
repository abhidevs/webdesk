const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subjectId: { type: String, required: true },
    teacherIds: { type: Array, required: true },
    day: { type: String, required: true },
    time: { type: String, required: true },
    course: { type: String, required: true },
    semester: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Schedule", ScheduleSchema);
