const express = require("express");
const ConnectDB = require("./config/db");
const User = require("./models/user");

const app = express();
const Port = 8888;

app.use(express.json());

app.post("/signUp", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("Saved");
  } catch (err) {
    res.status(400).send("Error Saving the user " + err.message);
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

ConnectDB()
  .then(() => {
    console.log("DB Connected");

    app.listen(Port, () => {
      console.log("Server started");
    });
  })
  .catch((e) => console.error(e));
