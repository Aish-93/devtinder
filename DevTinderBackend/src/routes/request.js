const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {

//form user auth we will get information of logged in user  check from auth.js

const fromUserId = req.user._id; // loggedInUserId
const toUserId = req.params.toUserId; // touserid
const status = req.params.status // touserId

const allowedStatus = ["ignored","interested"];

if(!allowedStatus.includes(status)){
    return res.status(400).json({message:"Invlid status type "+ status})
}

const toUser = await User.findById({_id: toUserId });

if(!toUser){
    res.status(400).send("sending to invalid user!!!")
}

const existingConnectionRequest = await ConnectionRequest.findOne({
    $or:[ // need to check from mongo  for reverse 
        {fromUserId, toUserId},
        { fromUserId: toUserId,toUserId:fromUserId}
    ]
    
});

if(existingConnectionRequest){
    return res.status(400).json({ message:"Connection Request already made"})
}

const connectionRequest = new ConnectionRequest({
    fromUserId,toUserId,status
})

const data = await connectionRequest.save();

res.json({
    message:`Connection Request ${status}` ,
    data   
})

    } catch (err) {
      res.status(400).send("Error :" + err.message);
    }
  }
);

module.exports = requestRouter;
