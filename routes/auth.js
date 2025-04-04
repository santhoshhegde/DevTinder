const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const {
  validationForSignUp,
  validationForSignIn,
} = require("../utils/validate");

authRouter.post("/signUp", async (req, res) => {
  try {
    validationForSignUp(req.body);
    const { firstName, lastName, email, password, gender, age, about, skills } =
      req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      gender,
      age,
      about,
      skills,
    });

    const jwtToken = await user.getJWT();
    res.cookie("token", jwtToken, {
      expires: new Date(Date.now() + 8 * 3600000),
    });
    await user.save();
    res.json({ message: "Saved", data: user });
  } catch (err) {
    res.status(400).send("Error Saving the user " + err.message);
  }
});

authRouter.post("/signIn", async (req, res) => {
  try {
    validationForSignIn(req.body);
    const { email, password } = req.body;
    const exsistingUser = await User.findOne({ email });
    // console.log(exsistingUser);
    if (!exsistingUser) {
      return res.status(401).send("Invalid credentials");
    }
    const exsistPassword = await exsistingUser.verifyPassword(password);

    if (!exsistPassword) {
      return res.status(401).send("Invalid credentials");
    } else {
      const jwtToken = await exsistingUser.getJWT();

      res.cookie("token", jwtToken, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send(exsistingUser);
    }
  } catch (err) {
    res.status(400).send("Error " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("Logout successful");
});
module.exports = authRouter;
