const { User, validate } = require("../models/User");
const Token = require("../models/Token");
const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const sendEmail = require("../utils/email");

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const { error } = validate(req.body);
    console.log(error);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) return res.status(400).send("Email already exist");
    console.log("vvvvvvvvv", req.body);
    user = await new User({
      name: req.body.name,
      email: req.body.email,
    }).save();

    let token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    const message = `${process.env.BASE_URL}/users/verify/${user._id}/${token.token}`;
    console.log(message);
    console.log(user.email);
    await sendEmail(user.email, "verify email", message);
    res.send("email send to your account");
  } catch (error) {
    res.status(400).send("An error accoured");
  }
});

router.get("/verify/:id/:token", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    console.log("verify", user);
    if (!user) return res.status(400).send("invalid link");

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    console.log("verify", user);
    if (!token) return res.status(400).send("invalid link");
    await User.updateOne({ _id: user._id, verified: true });
    await Token.findByIdAndRemove(token._id);
    res.send("Email Verify Successfully");
  } catch (error) {
    res.status(400).send("An error occured");
  }
});

module.exports = router;
