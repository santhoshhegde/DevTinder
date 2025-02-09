const adminAuth = (req, res, next) => {
  const token = "xyz";
  if (token == "xyz") {
    console.log("Sent all the Data");
    next();
  } else {
    res.status(401).send("Unautharoised");
  }
};

const userAuth = (req, res, next) => {
  console.log("Auth....");
  const token = "user";
  if (token == "user") {
    next();
  } else {
    res.status(401).send("Unauthorised");
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
