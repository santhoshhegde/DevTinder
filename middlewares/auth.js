const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    console.log(req);
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid token");
    }
    const decodedObj = jwt.verify(token, "DevTinder@22/2/2025");
    req.user = await User.findById(decodedObj._id);
    next();
  } catch (err) {
    res.status(400).send("Error in middleware " + err.message);
  }
};

module.exports = {
  userAuth,
};
