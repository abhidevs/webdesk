const router = require("express").Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register
router.post("/register", async (req, res) => {
  const newUser = new User({
    email: req.body.email,
    fullname: req.body.fullname,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.CRYPTOJS_SECRET_KEY
    ).toString(),
    isTeacher: req.body.isTeacher,
    course: req.body.course,
    semester: req.body.semester,
  });

  try {
    const user = await newUser.save();

    const accessToken = jwt.sign(
      { id: user._id, isTeacher: user.isTeacher, isAdmin: user.isAdmin },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30d" }
    );

    const { password, ...userInfo } = user._doc;
    res.status(201).json({ ...userInfo, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.status(401).json("email does not exist");
    } else {
      const bytes = CryptoJS.AES.decrypt(
        user.password,
        process.env.CRYPTOJS_SECRET_KEY
      );
      const originalPwd = bytes.toString(CryptoJS.enc.Utf8);

      if (req.body.password !== originalPwd) {
        res.status(401).json("wrong password");
      } else {
        const accessToken = jwt.sign(
          { id: user._id, isTeacher: user.isTeacher, isAdmin: user.isAdmin },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "30d" }
        );

        const { password, ...userInfo } = user._doc;
        res.status(200).json({ ...userInfo, accessToken });
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
