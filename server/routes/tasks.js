const router = require("express").Router();
const Task = require("../models/Task");
const Subject = require("../models/Subject");
const verify = require("../verifyToken");

// Create
router.post("/", verify, async (req, res) => {
  if (req.user.isTeacher || req.user.isAdmin) {
    const newTask = new Task(req.body);

    try {
      const savedTask = await newTask.save();
      res.status(201).json(savedTask);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You're not allowed to do this!");
  }
});

// Get
router.get("/find/:id", verify, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Recent Ones
router.get("/recent", verify, async (req, res) => {
  try {
    const newTasks = await Task.find().sort({ _id: -1 }).limit(2);
    res.status(200).json(newTasks);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get All
router.get("/:subject", verify, async (req, res) => {
  try {
    let allTasks;
    if (req.params.subject === "all") {
      allTasks = await Task.find().sort({ _id: -1 });
    } else {
      const subject = await Subject.findOne({ name: req.params.subject });
    //   console.log(req.params.subject, subject._id);
      allTasks = await Task.find({
        subjectId: subject._id,
      }).sort({ _id: -1 });
    }
    res.status(200).json(allTasks);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update
router.put("/:id", verify, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    // console.log(task.posterId);

    if (req.user.id === task.posterId || req.user.isAdmin) {
      const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json(updatedTask);
    } else {
      res.status(403).json("You're not allowed to do this!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete
router.delete("/:id", verify, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (req.user.id === task.posterId || req.user.isAdmin) {
      await Task.findByIdAndDelete(req.params.id);
      res.status(200).json("Task has been deleted...");
    } else {
      res.status(403).json("You're not allowed to do this!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
