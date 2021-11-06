const router = require("express").Router();
const Subject = require("../models/Subject");
const verify = require("../verifyToken");

// Create
router.post("/", verify, async (req, res) => {
  if (req.user.isTeacher || req.user.isAdmin) {
    const newSubject = new Subject(req.body);

    try {
      const savedSubject = await newSubject.save();
      res.status(201).json(savedSubject);
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
    const subject = await Subject.findById(req.params.id);
    res.status(200).json(subject);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all subjects or all for a specific course and semester
router.get("/all", verify, async (req, res) => {
  const course = req.query.course;
  const sem = req.query.sem;

  try {
    let allSubjects;

    if (course && sem) {
      allSubjects = await Subject.find({
        course: course,
        semester: sem,
      }).sort({ _id: -1 });
    } else if (course) {
      allSubjects = await Subject.find({
        course: course,
      }).sort({ _id: -1 });
    } else {
      allSubjects = await Subject.find().sort({ _id: -1 });
    }

    res.status(200).json(allSubjects);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update
router.put("/:id", verify, async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    // console.log(subject.teacherIds, req.user.id);

    if (subject.teacherIds.includes(req.user.id) || req.user.isAdmin) {
      const updatedSubject = await Subject.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json(updatedSubject);
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
    const subject = await Subject.findById(req.params.id);

    if (subject.teacherIds.includes(req.user.id) || req.user.isAdmin) {
      await Subject.findByIdAndDelete(req.params.id);
      res.status(200).json("Subject has been deleted...");
    } else {
      res.status(403).json("You're not allowed to do this!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
