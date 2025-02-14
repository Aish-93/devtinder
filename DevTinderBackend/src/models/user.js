const mongoose = require('mongoose');

// creating a schema
const userSchema = new mongoose.Schema({

  firstName:{
    type: String
  },
  lastName:{
    type: String
  },
  emailId:{
    type: String
  },
  password:{
    type: String
  },
  age:{
    type: Number
  },
  gender:{
    type: String
  },

});

const UserModal = mongoose.model("User", userSchema); // name of model is starts with capital

module.exports = UserModal