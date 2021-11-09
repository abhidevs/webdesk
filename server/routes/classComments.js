const router = require("express").Router();
const ClassComment = require("../models/ClassComment");
const verify = require("../verifyToken");

// Create
router.post("/", verify, async (req, res) => {
  req.body.poster = req.user.id;
  const newClassComment = new ClassComment(req.body);

  await newClassComment.save(function (err) {
    if (err) res.status(500).json(err);

    newClassComment.populate(
      {
        path: "poster",
        select: ["fullname", "profilePic"],
      },
      function (err, doc) {
        if (err) res.status(500).json(err);
        else res.status(201).json(doc);
      }
    );
  });
});

// Get
router.get("/find/:id", verify, async (req, res) => {
  try {
    const classComment = await ClassComment.findById(req.params.id).populate({
      path: "poster",
      select: ["fullname", "profilePic"],
    });

    res.status(200).json(classComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all comments of a specific material or task
// router.get("/all/:postedIn&:parentId", verify, async (req, res) => {
//   try {
//     const allClassComments = await ClassComment.find({
//       postedIn: req.params.postedIn,
//       parentId: req.params.parentId,
//     })
//       .sort({ _id: -1 })
//       .populate({
//         path: "poster",
//         select: ["fullname", "profilePic"],
//       });

//     res.status(200).json(allClassComments);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Update
router.put("/:id", verify, async (req, res) => {
  try {
    const classComment = await ClassComment.findById(req.params.id);
    // console.log(classComment.poster);

    if (req.user.id === classComment.poster || req.user.isAdmin) {
      const updatedClassComment = await ClassComment.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      ).populate({
        path: "poster",
        select: ["fullname", "profilePic"],
      });

      res.status(200).json(updatedClassComment);
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
    const classComment = await ClassComment.findById(req.params.id);

    if (req.user.id === classComment.poster || req.user.isAdmin) {
      await ClassComment.findByIdAndDelete(req.params.id);
      res.status(200).json("ClassComment has been deleted...");
    } else {
      res.status(403).json("You're not allowed to do this!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
