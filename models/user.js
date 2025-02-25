const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 20,
    },
    lastName: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(val) {
        if (!validator.isEmail(val)) {
          throw new Error("Invalid Email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(val) {
        if (!validator.isStrongPassword(val)) {
          throw new Error("Enter strong password");
        }
      },
    },
    gender: {
      type: String,
      lowercase: true,
      validate(val) {
        if (!["male", "female", "others"].includes(val)) {
          throw new Error("Gender type invalid");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
      max: 100,
    },
    about: { type: String, default: "I am SDE" },
    skills: { type: [String] },
  },
  { timestamps: true }
);
userSchema.index({ firstName: 1, lastName: 1 });

userSchema.methods.getJWT = function () {
  const user = this;
  token = jwt.sign({ _id: user._id }, "DevTinder@22/2/2025", {
    expiresIn: "1d",
  });
  return token;
};

userSchema.methods.verifyPassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  return isPasswordValid;
};
module.exports = mongoose.model("User", userSchema);
