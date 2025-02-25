const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

requestRouter.post("/sendConnection", userAuth, (req, res) => {
  try {
    const { firstName } = req.user;
    res.send(firstName + " sent a request");
  } catch (err) {
    res.status(400).send("error " + err.message);
  }
});

module.exports = requestRouter;
