const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connection");
const User = require("../models/user");

userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connections = await ConnectionRequestModel.find({
      toUserId: loggedInUser._id,
      status: "interested",
    })
      .populate("fromUserId", "firstName")
      .populate("toUserId", "firstName");

    res.json({ message: "Connection requests", data: connections });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const USER_SAFE_DATA = "firstName lastName gender age about skills";
    const loggedInUser = req.user;
    const connections = await ConnectionRequestModel.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);
    const data = connections.map((row) => {
      if (row.fromUserId.equals(loggedInUser._id)) {
        return row.toUserId;
      } else {
        return row.fromUserId;
      }
    });
    res.json({ message: "Connections", data });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequestModel.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    });
    // .populate("fromUserId", "firstName")
    // .populate("toUserId", "firstName");

    const userExclude = new Set();
    connectionRequest.forEach((user) => {
      if (user.fromUserId.equals(loggedInUser._id)) {
        userExclude.add(user.toUserId);
      } else {
        userExclude.add(user.fromUserId);
      }
    });

    const feedUser = await User.find({
      $or: [
        { fromUserId: { $nin: Array.from(userExclude) } },
        { toUserId: { $nin: Array.from(userExclude) } },
      ],
    });
    res.json({ message: "User list", data: feedUser });
  } catch (err) {
    res.status(400).json("Error: " + err.message);
  }
});
module.exports = userRouter;
