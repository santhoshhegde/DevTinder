const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const ConnectDB = require("./config/db");
const User = require("./models/user");
const {
  validationForSignUp,
  validationForSignIn,
} = require("./utils/validate");
const bcrypt = require("bcrypt");
const app = express();
const Port = 8888;

app.use(express.json());
app.use(cookieParser());

app.post("/signUp", async (req, res) => {
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

    await user.save();
    res.send("Saved");
  } catch (err) {
    res.status(400).send("Error Saving the user " + err.message);
  }
});

app.post("/signIn", async (req, res) => {
  try {
    validationForSignIn(req.body);
    const { email, password } = req.body;
    const exsistingUser = await User.findOne({ email });
    // console.log(exsistingUser);
    if (!exsistingUser) {
      throw new Error("Invalid credentials email");
    }
    const exsistPassword = await bcrypt.compare(
      password,
      exsistingUser.password
    );
    if (!exsistPassword) {
      res.status(401).send("Invalid credentials password");
    } else {
      const jwtSecret = jwt.sign(
        { _id: exsistingUser._id },
        "DevTinder@22/2/2025"
      );
      res.cookie("asdf", "alsjdfkasjdf");
      res.cookie("token", jwtSecret);
      res.send("Login Successful");
    }
  } catch (err) {
    res.status(400).send("Error " + err.message);
  }
});

app.get("/profile", async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid Token");
    }
    const userId = jwt.verify(token, "DevTinder@22/2/2025");
    const user = await User.findById(userId._id);
    if (!user) {
      throw new Error("User not found");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.get("/user", async (req, res) => {
  try {
    const user = await User.find({ email: req.body.email });
    res.send(user);
  } catch (err) {
    res.status(400).send("Error Saving the user " + err.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const allUser = await User.find();
    if (allUser.length == 0) {
      res.status(404).send("No user found");
    } else {
      res.send(allUser);
    }
  } catch (err) {
    res.status(400).send("Error Saving the user " + err.message);
  }
});

app.patch("/update/:userId", async (req, res) => {
  try {
    const userId = req.params?.userId;
    const data = req.body;

    const allowed = [
      "age",
      "firstName",
      "lastName",
      "skills",
      "password",
      "about",
      "gender",
    ];
    const isAllowed = Object.keys(data).every((key) => allowed.includes(key));

    if (!isAllowed) {
      throw new Error("Update is not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }
    await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });
    res.send("Sucessfull");
  } catch (err) {
    res.status(400).send("Error Saving the user: " + err.message);
  }
});

app.delete("/user", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.body.userId);
    res.send("Deleted");
  } catch (err) {
    res.status(400).send("Error Saving the user " + err.message);
  }
});

ConnectDB()
  .then(() => {
    console.log("DB Connected");

    app.listen(Port, () => {
      console.log("Server started");
    });
  })
  .catch((e) => console.error(e));
