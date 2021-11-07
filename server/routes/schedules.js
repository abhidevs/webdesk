const router = require("express").Router();
const Schedule = require("../models/Schedule");
const verify = require("../verifyToken");

// Create
router.post("/", verify, async (req, res) => {
  if (req.user.isTeacher || req.user.isAdmin) {
    const newSchedule = new Schedule(req.body);

    try {
      const savedSchedule = await newSchedule.save();
      res.status(201).json(savedSchedule);
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
    const schedule = await Schedule.findById(req.params.id);
    res.status(200).json(schedule);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all schedules or all for a specific course and semester
router.get("/all", verify, async (req, res) => {
  const course = req.query.course;
  const sem = req.query.sem;

  try {
    let allSchedules;

    if (course && sem) {
      allSchedules = await Schedule.find({
        course: course,
        semester: sem,
      });
    } else if (course) {
      allSchedules = await Schedule.find({
        course: course,
      });
    } else {
      allSchedules = await Schedule.find();
    }

    res.status(200).json(allSchedules);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update
router.put("/:id", verify, async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);

    if (schedule.teacherIds.includes(req.user.id) || req.user.isAdmin) {
      const updatedSchedule = await Schedule.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json(updatedSchedule);
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
    const schedule = await Schedule.findById(req.params.id);

    if (schedule.teacherIds.includes(req.user.id) || req.user.isAdmin) {
      await Schedule.findByIdAndDelete(req.params.id);
      res.status(200).json("Schedule has been deleted...");
    } else {
      res.status(403).json("You're not allowed to do this!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
