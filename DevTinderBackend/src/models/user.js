const mongoose = require('mongoose');

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
    lowercase: true
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
    default:"https://www.shutterstock.com/image-vector/vector-design-avatar-dummy-sign-600nw-1290556063.jpg"
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

const UserModal = mongoose.model("User", userSchema); // name of model is starts with capital


module.exports = UserModal