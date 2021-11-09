const router = require("express").Router();
const Subject = require("../models/Subject");
const User = require("../models/User");
const verify = require("../verifyToken");

// Create
router.post("/", verify, async (req, res) => {
  if (req.user.isTeacher || req.user.isAdmin) {
    const newSubject = new Subject(req.body);

    await newSubject.save(function (err) {
      if (err) res.status(500).json(err);

      newSubject.populate(
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
    const subject = await Subject.findById(req.params.id).populate({
      path: "teachers",
      select: ["fullname", "profilePic"],
    });
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
      }).populate({
        path: "teachers",
        select: ["fullname", "profilePic"],
      });
    } else if (course) {
      allSubjects = await Subject.find({
        course: course,
      }).populate({
        path: "teachers",
        select: ["fullname", "profilePic"],
      });
    } else {
      allSubjects = await Subject.find().populate({
        path: "teachers",
        select: ["fullname", "profilePic"],
      });
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
    // console.log(subject.teachers, req.user.id);

    if (subject.teachers.includes(req.user.id) || req.user.isAdmin) {
      const updatedSubject = await Subject.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      ).populate({
        path: "teachers",
        select: ["fullname", "profilePic"],
      });

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

    if (subject.teachers.includes(req.user.id) || req.user.isAdmin) {
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
