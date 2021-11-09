const router = require("express").Router();
const Schedule = require("../models/Schedule");
const verify = require("../verifyToken");

// Create
router.post("/", verify, async (req, res) => {
  if (req.user.isTeacher || req.user.isAdmin) {
    const newSchedule = new Schedule(req.body);

    await newSchedule.save(function (err) {
      if (err) res.status(500).json(err);

      newSchedule.populate({
        path: "subject",
        select: "name",
      });

      newSchedule.populate(
        {
          path: "teachers",
          select: ["fullname", "profilePic"],
        },
        function (err, doc) {
          if (err) res.status(500).json(err);
          else res.status(201).json(doc);
        }
      );
    });
  } else {
    res.status(403).json("You're not allowed to do this!");
  }
});

// Get
router.get("/find/:id", verify, async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id)
      .populate({
        path: "subject",
        select: "name",
      })
      .populate({
        path: "teachers",
        select: ["fullname", "profilePic"],
      });

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
      })
        .populate({
          path: "subject",
          select: "name",
        })
        .populate({
          path: "teachers",
          select: ["fullname", "profilePic"],
        });
    } else if (course) {
      allSchedules = await Schedule.find({
        course: course,
      })
        .populate({
          path: "subject",
          select: "name",
        })
        .populate({
          path: "teachers",
          select: ["fullname", "profilePic"],
        });
    } else {
      allSchedules = await Schedule.find()
        .populate({
          path: "subject",
          select: "name",
        })
        .populate({
          path: "teachers",
          select: ["fullname", "profilePic"],
        });
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

    if (schedule.teachers.includes(req.user.id) || req.user.isAdmin) {
      const updatedSchedule = await Schedule.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      )
        .populate({
          path: "subject",
          select: "name",
        })
        .populate({
          path: "teachers",
          select: ["fullname", "profilePic"],
        });

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

    if (schedule.teachers.includes(req.user.id) || req.user.isAdmin) {
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
