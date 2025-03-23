const express = require("express");
const { userAuth } = require("../middlewares/auth");

const userRouter = express.Router();

const ConnectionRequest = require("../models/connectionRequest");

const USER_SAVE_DATA = ["firstName", "age", "lastName", "skills", "photoUrl"];

userRouter.get("/user/connection", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    console.log(loggedInUser, "check");

    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAVE_DATA)
      .populate("toUserId", USER_SAVE_DATA);

    const data = connectionRequest.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json({ data });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

// get all the connection request pending from the db

userRouter.get("/user/request/recieved", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", [
      "firstName",
      "lastName",
      "age",
      "skills",
      "gender",
      "photoUrl",
    ]); // we are populating the connection request with this id and filling firstName and lastName

    // const data = await connectionRequest.save();
    res.json({
      connectionRequest,
    });
  } catch (err) {
    throw new Error("Error message is: " + err.message);
  }
});

// userRouter.get("/user/feed",userAuth,(req,res)=>{
//     try{

//     }catch(err){
//         res.status(400).json({
//             message:err.message
//         })
//     }

// });

module.exports = userRouter;

// "firstName": "Sonam",
// "lastName": "Pandey",
// "emailId": "Pandey123@gmail.com",
// "password": "Sonam6@Aish"

// "firstName": "Amita",
// "lastName": "Pratap",
// "emailId": "Pratap123@gmail.com",
// "password": "Pratap6@Aish"

// "firstName": "Sanya",
// "lastName": "khan",
// "emailId": "KhanSy123@gmail.com",
// "password": "Khan6@Aish"

  // "firstName": "varun",
    // "lastName": "Chrkraborty",
    // "emailId": "varunckb@gmail.com",
    // "password": "varun6Aish%^&*"
  
    // "firstName": "Axar",
    //   "lastName": "Patel",
    //   "emailId": "patelAxar@gmail.com",
    //   "password": "patel7Aish%^&*"

    // "firstName": "Axar",
    //   "lastName": "Patel",
    //   "emailId": "rahul123@gmail.com",
    //   "password": "rahul7Aish%^&*"

//     "emailId": "kuldeepyad123@gmail.com",
//     "password": "patel7Aish%^&*"
// }
