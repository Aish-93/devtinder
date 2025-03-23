const express = require('express');
const bcrypt = require('bcrypt')

const User = require("../models/user");
const authRouter = express.Router();
const  validateSignUpData  = require("../utils/validation");
const emailValidtaor = require("../utils/validation");

authRouter.post("/signup", async (req, res) => {
    
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

authRouter.post("/login", async( req,res ) =>{

    // will take the emil id and password and validate from data base the password is valid or not mean decrypt the password
  
  
    const { emailId,password} = req.body;
  
    // const validationBoolean = emailValidtaor(emailId);
    
    try{
      
      const user = await User.findOne({emailId:emailId});
  
      if(!user){
          throw new Error("Invalid credantials");
      }
  
      const isValidPassword = user.passwordValid(password)
      
      // await bcrypt.compare(password,user.password);
      if(isValidPassword){
  
        // we are setting up a token  sending in response 
        // sign { hidden data } , secert key 
  const token = await user.getJWT();
  
        res.cookie("token",token,{
          expires: new Date(Date.now()+ 8 * 3600000)
        })
  
        res.send("Welcome user : " + user.firstName + " login successful!!")
      }else{
        throw new Error("Entered password is invalid")
      }
  
    }catch (err) {
      
        res.status(400).send("error in posting data " + err.message);
      
    }
  });

  authRouter.post("/logout", async (req, res ) =>{

    res.cookie("token",null,{
        expires: new Date(Date.now()),
    });
    res.send("Logout successfull");
  })

module.exports = authRouter;