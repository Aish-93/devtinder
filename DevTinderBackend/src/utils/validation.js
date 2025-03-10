const validator = require("validator");
const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  console.log(firstName, lastName, emailId, password);
  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Enter valid email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
};

const emailValidator = (data) => {
  if (validator.isEmail(data)) {
    return true;
  } else return false;
};

const validateEditProfileData = (req) => {
  
  const allowedEditFileds = [
    "firstName",
    "lastName",
    "about",
    "photoUrl",
    "gender",
    "skills",
    "age",
  ];

  const isEditAllowed = Object.keys(req.body).every((item) =>
    allowedEditFileds.includes(item)
  );

  return isEditAllowed;
};
module.exports = { validateSignUpData, validateEditProfileData,emailValidator };

// module.exports= emailValidtaor;

// module.exports = validateEditProfileData;
