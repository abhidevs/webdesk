const router = require("express").Router();
const Material = require("../models/Material");
const Subject = require("../models/Subject");
const verify = require("../verifyToken");

// Create
router.post("/", verify, async (req, res) => {
  if (req.user.isTeacher || req.user.isAdmin) {
    req.body.poster = req.user.id;
    const newMaterial = new Material(req.body);

    await newMaterial.save(function (err) {
      if (err) res.status(500).json(err);

      newMaterial.populate({
        path: "subject",
        select: "name",
      });

      newMaterial.populate({
        path: "poster",
        select: ["fullname", "profilePic"],
      });

      newMaterial.populate(
        {
          path: "comments",
          populate: {
            path: "poster",
            select: ["fullname", "profilePic"],
          },
          select: ["comment", "poster", "createdAt"],
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
    const material = await Material.findById(req.params.id)
      .populate({
        path: "subject",
        select: "name",
      })
      .populate({
        path: "poster",
        select: ["fullname", "profilePic"],
      })
      .populate({
        path: "comments",
        populate: {
          path: "poster",
          select: ["fullname", "profilePic"],
        },
        select: ["comment", "poster", "createdAt"],
      });

    res.status(200).json(material);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Recent Ones
router.get("/recent", verify, async (req, res) => {
  try {
    const newMaterials = await Material.find()
      .sort({ _id: -1 })
      .limit(2)
      .populate({
        path: "subject",
        select: "name",
      })
      .populate({
        path: "poster",
        select: ["fullname", "profilePic"],
      })
      .populate({
        path: "comments",
        populate: {
          path: "poster",
          select: ["fullname", "profilePic"],
        },
        select: ["comment", "poster", "createdAt"],
      });

    res.status(200).json(newMaterials);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get All
router.get("/:subject", verify, async (req, res) => {
  try {
    let allMaterials;
    if (req.params.subject === "all") {
      allMaterials = await Material.find()
        .sort({ _id: -1 })
        .populate({
          path: "subject",
          select: "name",
        })
        .populate({
          path: "poster",
          select: ["fullname", "profilePic"],
        })
        .populate({
          path: "comments",
          populate: {
            path: "poster",
            select: ["fullname", "profilePic"],
          },
          select: ["comment", "poster", "createdAt"],
        });
    } else {
      const subject = await Subject.findOne({ name: req.params.subject });
      //   console.log(req.params.subject, subject._id);
      allMaterials = await Material.find({
        subject: subject._id,
      })
        .sort({ _id: -1 })
        .populate({
          path: "subject",
          select: "name",
        })
        .populate({
          path: "poster",
          select: ["fullname", "profilePic"],
        })
        .populate({
          path: "comments",
          populate: {
            path: "poster",
            select: ["fullname", "profilePic"],
          },
          select: ["comment", "poster", "createdAt"],
        });
    }
    res.status(200).json(allMaterials);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update
router.put("/:id", verify, async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    // console.log(material.poster);

    if (req.user.id === material.poster || req.user.isAdmin) {
      const updatedMaterial = await Material.findByIdAndUpdate(
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
        path: "poster",
        select: ["fullname", "profilePic"],
      })
      .populate({
        path: "comments",
        populate: {
          path: "poster",
          select: ["fullname", "profilePic"],
        },
        select: ["comment", "poster", "createdAt"],
      });

      res.status(200).json(updatedMaterial);
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
    const material = await Material.findById(req.params.id);

    if (req.user.id === material.poster || req.user.isAdmin) {
      await Material.findByIdAndDelete(req.params.id);
      res.status(200).json("Material has been deleted...");
    } else {
      res.status(403).json("You're not allowed to do this!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
