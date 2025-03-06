// starting file of the application
// creating the backend for dev tider and apis
// creating the server and listen accepting api request
// using the express.js creating the server

// console.log("starting the new  project nodejs")

const express = require("express");
const { connectDB } = require("./config/database");
const bcrypt = require('bcrypt')
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
// express.json middlle ware will be activated to all thr routes  by

app.use(express.json());
app.use(cookieParser());

const User = require("./models/user");


const  validateSignUpData  = require("./utils/validation");
const emailValidtaor = require("./utils/validation");



// get will make only get call

// req is /user it will match /user, /user/xyz, /user/sdkhbks etc
// app.get("/user",(req,res)=>{
// console.log("checked")
// res.send("response1 ");

// console.log("second")
// })

// app.post("/user",(req,res)=>{

//     res.send({
//         name:"Aish",
//         age:31,
//         place:"Bhopal"
//     });
// });

// app.delete("/user",(req,res)=>{

//     res.send("user deleted successfully")
// })

// use is to make all type of calls like post get put etc

// app.use("/home",(req,res)=>{

//     res.send("Hello this is for home")
// });

// app.use("/test",(req,res)=>{

//     res.send("Hello this is for test")
// });

// app.use("/",(req,res)=>{

//     res.send("Hello from server")
// });

// making some advance routes

// app.get("/abc",(req,res)=>{
//     res.send({
//         firstname:"king",
//         lastName:"kohil"
//     })
// });

// so reguler expressions works here

// app.get("/ab?c",(req,res)=>{
//     res.send({
//         firstname:"king",
//         lastName:"kohil"
//     })
// });

// so match the patter over here
// first databse should be connected then server should start hitting

// creating a post api
User.createIndexes()
  .then(() => {
    console.log("Indexes created successfully.");
  })
  .catch((err) => {
    console.log("Error creating indexes:", err);
  });

app.post("/signup", async (req, res) => {
  console.log(req,"req")

  try { 
    //  validateSignUpData(req)
  // creating a new instance of the user model
  const {firstName, lastName, emailId, password } = req.body;

  console.log(req.body,"reqbody")
  const passwordHash = await bcrypt.hash(password,10);
  console.log(passwordHash,"hash");
  // creating new instanceof user model
  const user = new User({
    firstName,
    lastName,
    emailId,
    password:passwordHash
  });

    await user.save();
    res.send("user added successfully");
  } catch (err) {
    if (err.code === 1100) {
      res.status(400).send("Duplicate email found");
    } else {
      res.status(400).send("error in posting data " + err.message);
    }
  }
});

// find one user getuser

app.get("/user", async (req, res) => {
  const uesrEmailId = req.body.emailId;

  try {
    const user = await User.find({
      emailId: uesrEmailId,
    });
    if (user.length == 0) {
      res.status(404).send("No user found with giving Email ID");
    } else {
      res.send(user);
    }
  } catch (err) {
    console.warn(err);
  }
});

app.get("/userOne", async (req, res) => {
  const uesrEmailId = req.body.emailId;

  try {
    const user = await User.findOne({
      emailId: uesrEmailId,
    });
    if (user.length == 0) {
      res.status(404).send("No user found with giving Email ID");
    } else {
      res.send(user);
    }
  } catch (err) {
    console.warn(err);
  }
});

// feed api  -get /feed get all users from the data base

app.get("/feed", async (req, res) => {
  try {
    const usersAll = await User.find({});
    res.send(usersAll);
  } catch (err) {
    console.warn(err);
    res.status(400).send("Something went wrong");
  }
});

// delete a single user based on emailid

// we can also use findByIdAndDelete

app.delete("/delete", async (req, res) => {
  const toDeleteUser = req.body.emailId;
  console.log(toDeleteUser);

  const user = await User.deleteOne({ emailId: toDeleteUser });
  res.send(user + "deleted successfully");
  try {
  } catch (err) {
    res.status(404).send("User not found");
  }
});

// update the data of the user from db from patch

app.patch("/update/:id", async (req, res) => {
  // const id = req.body.id; // if we send id from the req
  const id = req.params?.id;
  const data = req.body;
  console.log(id)

  // first para to find which doc to update, second para what to update

 
  try {

    const ALLOWED_UPDATE =["gender","skills","age","photoUrl","about",];

    const skillLength = req.body.skills.length;
    const isUpdateAllowed = Object.keys(data).every((item)=>{  
     return   ALLOWED_UPDATE.includes(item)
      })
    
      if(!isUpdateAllowed){
        // res.status(400).send("Upadting thess field not allowed")
        throw new Error("Updating these field not allowed")
      }
      if(skillLength >5){
        throw new Error("Cannot add more then 5 skills")
      }

    await User.findByIdAndUpdate({ _id: id }, data,{
      runValidators:true
    });
    res.send("User updated successfully");
  
  } catch (err) {
    console.warn(err);
    res.status(400).send("update failed " + err.message);
  }
});

app.post("/login", async( req,res ) =>{

  // will take the emil id and password and validate from data base the password is valid or not mean decrypt the password
  // "firstName": "varun",
  // "lastName": "Chrkraborty",
  // "emailId": "varunckb@gmail.com",
  // "password": "varun6Aish%^&*"

  // "firstName": "Axar",
  //   "lastName": "Patel",
  //   "emailId": "patelAxar@gmail.com",
  //   "password": "patel6Aish%^&*"

  const { emailId,password} = req.body;

  const validationBoolean = emailValidtaor(emailId)
  
  try{
    
    const user = await User.findOne({emailId:emailId});

    if(!user){
        throw new Error("Invalid credantials");
    }

    const isValidPassword = await bcrypt.compare(password,user.password);
    if(isValidPassword){

      // we are setting up a token  sending in response 
      // sign { hidden data } , secert key 
      const token = await jwt.sign({
        _id:user._id
      },"Aish@rocky@00");

      res.cookie("token",token)

      res.send("Welcome user : " + user.firstName + " login successful!!")
    }else{
      throw new Error("Entered password is invalid")
    }

  }catch (err) {
    
      res.status(400).send("error in posting data " + err.message);
    
  }
})

// profile api 

app.get("/profile", async (req,res) =>{

try {
  const cookie = req.cookies;
  console.log(cookie, "cookeis");

  const { token } = cookie;
  // validate the token
  // if(true){
  if(!token){
    throw new Error ("Invalid token");
  }
 

  const decodedDataBack = await jwt.verify(token, "Aish@rocky@00");


  const user = await User.findById(decodedDataBack._id)
  if(!user){
    throw new Error("try login again!!")
  }
  res.send(user);
} catch (err) {
  res.status(400).send("error in posting data " + err.message);
}
// }
// else{
  // res.status(400).send("login again")
// }
// res.send("Just reading cookie..")

})
connectDB()
  .then(() => {
    console.log("successfully connected");
    app.listen(3001, () => {
      console.log("server is running ");
    }); // this will connect the database
  })
  .catch((err) => {
    console.log(err);
  });
