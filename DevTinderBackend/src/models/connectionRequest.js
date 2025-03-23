const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({

    // from user to to user     

    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },

    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },

    status:{
        type:String,
        required: true,
        enum:{
            values:["ignored","accepted","rejected","interested"],
            message:`{value} is incorrect status type`
        }
    }
},{
    timestamps:true
});


// creating index 

connectionRequestSchema.index({ fromUserId:1, toUserId:1})
// wecan write the pre read about it on mongo lib

connectionRequestSchema.pre("save", function(next){

    const connectionRequest = this;
    // we are using this so we will never uae arrow function 
     // if to and from is is same c
     

     if( connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send request to oneself!!!")
     }

     next()// it is kind of middleware so always called next
})

const ConnectionRequestModal = new mongoose.model("ConnectionRequest",connectionRequestSchema) // always start with capital

module.exports = ConnectionRequestModal