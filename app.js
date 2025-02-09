const express = require("express");
const ConnectDB = require("./config/db");
const User = require("./models/user");

const app = express();
const Port = 8888;

app.post("/signUp", (req, res) => {
  const user = new User({
    firstName: "Sita",
    lastName: "Ram",
    age: 10000000000,
    email: "ram@ram.in",
    password: "Ram",
    gender: "F",
  });
  try {
    user.save();
    res.send("Saved");
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
