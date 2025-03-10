const mongoose = require('mongoose');

const validator = require('validator');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
// creating a schema
const userSchema = new mongoose.Schema({

  firstName:{
    type: String,
    required:true,
    minLength: 4,
    maxLength: 15
  },
  lastName:{
    type: String,
    minLength: 4,
    maxLength: 15
    
  },
  emailId:{
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value){

      if(!validator.isEmail(value)){
        throw new Error("Entered email is not valid")
      }
    }
  },
  password:{
    type: String,
    required: true
  },
  age:{
    type: Number,
    min: 18
  },
  gender:{
    type: String,
    validate(value){
      if(!['male','female','others'].includes(value)){
       throw new Error("Gender data is not valid")
      }
    }
  },
  photoUrl:{

    type:String,
    default:"https://www.shutterstock.com/image-vector/vector-design-avatar-dummy-sign-600nw-1290556063.jpg",
    validate(value){

      if(!validator.isURL(value)){
        throw new Error("Entered url is not valid")
      }
    }
  },
  about:{
    type:String,
    default:"This is defaultvalue about user"
  },
  skills:{
    type:[String],
  }

},{
  timestamps:true
});

userSchema.methods.getJWT = async function () {
  const user = this; // this refres to the instance of document in a DB
      
const token = await jwt.sign({
    _id:user._id
  },"Aish@rocky@00",{expiresIn:"7d"});

  return token;
}

userSchema.methods.passwordValid = async function (passwordInputByUser) {

  const user  = this;

  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(passwordInputByUser , passwordHash);

  return isPasswordValid;
}

const UserModal = mongoose.model("User", userSchema); // name of model is starts with capital

// never use arrow function here other it will break



// module.exports = mongoose.model("User",userSchema)
module.exports = UserModal