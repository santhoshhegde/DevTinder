const validator = require("validator");

const validationForSignUp = (req) => {
  const { firstName, lastName, email, password } = req;

  if (!firstName || !lastName) {
    throw new Error("Enter the first name and last name");
  }
  if (!email) {
    throw new Error("Please Provide valid Email");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Enter strong password");
  }
};

const validationForSignIn = (req) => {
  const { email, password } = req;
  if (!email || !validator.isEmail(email)) {
    throw new Error("Enter valid email");
  }
  if (!password) {
    throw new Error("Enter valid password");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "gender",
    "gender",
    "age",
    "skills",
    "about",
  ];

  const isEditAllowed = Object.keys(req).every((field) =>
    allowedEditFields.includes(field)
  );
  return isEditAllowed;
};

module.exports = {
  validationForSignUp,
  validationForSignIn,
  validateEditProfileData,
};
