const mongoose = require("mongoose");

const ConnectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://santhoshhegde:hf95uHlEO7VUghE4@learningnode.vmmt2.mongodb.net/devTinder"
  );
};

module.exports = ConnectDB;
