const express = require('express');
const bcrypt = require('bcrypt')
const { userAuth } = require("../middlewares/auth");

const { validateEditProfileData,emailValidator } = require("../utils/validation");
const User = require("../models/user");
const profileRouter = express.Router();

profileRouter.get("/profile/view",userAuth, async (req,res) =>{

    try {
      // const decodedDataBack = await jwt.verify(token, "Aish@rocky@00");
    const user = req.user;
      res.send(user);
    } catch (err) {
      res.status(400).send("error in posting data " + err.message);
    }
    });


profileRouter.patch("/profile/edit",userAuth ,async (req,res) =>{

    // select from req which id or profile to be edited 
    // again we take from req, what we to be edited from api 
    // then edit by machting and updatin the same documnet 
console.log(req,"bosy")
    try{
       if(!validateEditProfileData(req)){
        throw new Error ("Invalid Edit request");

       }

       const loggedInUser = req.user; // req.user is logged in user which we get from database 
       // we will tehn update the user and push it to data base
       // req.body i will put to update the user in db

      //  req.user.skills=  req.body.skills;
       Object.keys(req.body).forEach(key => (loggedInUser[key] = req.body[key]))

console.log(loggedInUser);
await loggedInUser.save();
res.send(`${loggedInUser.firstName} your profile updated successfully`)
    }
    catch(err){
  res.status(400).send("Error : " + err.message)
    }
}); 

profileRouter.patch("/profile/password", async(req,res) =>{
//this is a forgot password api 
// enter the emailId for which user the password need to be changed if matched then update the password.
const {emailId,newPassword,confirmPassword} = req.body;

try{
if(!emailValidator(emailId)){

  throw new Error ("Please enter valid emailId")
}
if(newPassword === confirmPassword){

const user = await User.findOne({emailId:emailId});
console.log(user,"user");

const passwordHash = await bcrypt.hash(newPassword,10);

user.password = passwordHash;

console.log("2",user)
await user.save();
res.send("updating password")

  
}else{
  throw new Error("New password and confirm password doesnot match!!!")
}



}catch(err){
res.status(400).send("Error :" + err.message)
}

});
module.exports = profileRouter;