const router = require("express").Router();
const Doubt = require("../models/Doubt");
const Subject = require("../models/Subject");
const verify = require("../verifyToken");

// Create
router.post("/", verify, async (req, res) => {
  req.body.posterId = req.user.id;
  const newDoubt = new Doubt(req.body);

  try {
    const savedDoubt = await newDoubt.save();
    res.status(201).json(savedDoubt);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get
router.get("/find/:id", verify, async (req, res) => {
  try {
    const doubt = await Doubt.findById(req.params.id);
    res.status(200).json(doubt);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Recent Ones
router.get("/recent", verify, async (req, res) => {
  try {
    const newDoubts = await Doubt.find().sort({ _id: -1 }).limit(3);
    res.status(200).json(newDoubts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get All
router.get("/:subject", verify, async (req, res) => {
  try {
    let allDoubts;
    if (req.params.subject === "all") {
      allDoubts = await Doubt.find().sort({ _id: -1 });
    } else {
      const subject = await Subject.findOne({ name: req.params.subject });
      //   console.log(req.params.subject, subject._id);
      allDoubts = await Doubt.find({
        subjectId: subject._id,
      }).sort({ _id: -1 });
    }
    res.status(200).json(allDoubts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update
router.put("/:id", verify, async (req, res) => {
  try {
    const doubt = await Doubt.findById(req.params.id);
    // console.log(doubt.posterId);

    if (req.user.id === doubt.posterId || req.user.isAdmin) {
      const updatedDoubt = await Doubt.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json(updatedDoubt);
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
    const doubt = await Doubt.findById(req.params.id);

    if (req.user.id === doubt.posterId || req.user.isAdmin) {
      await Doubt.findByIdAndDelete(req.params.id);
      res.status(200).json("Doubt has been deleted...");
    } else {
      res.status(403).json("You're not allowed to do this!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
