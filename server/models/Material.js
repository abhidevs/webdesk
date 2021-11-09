const mongoose = require("mongoose");

const MaterialSchema = new mongoose.Schema(
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
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    course: { type: String, required: true },
    semester: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Material", MaterialSchema);
