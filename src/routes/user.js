const express=require("express");
const ConnectionRequest = require("../models/connectionRequest");
const { userAuthentication } = require("../middlewares/auth");
const userRouter=express.Router();
const User =require("../models/user")
const USER_SAFE_DATA=  "firstName lastName photoUrl age gender about skills"
// get all the pending request for the loggedin user
userRouter.get("/user/requests/received",userAuthentication,async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const connectionRequest=await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested"
        }).populate(
            "fromUserId",
          USER_SAFE_DATA
        )  
        res.json({ success: true,message:"Data fetched successfully",
            data:connectionRequest
        })
    }
    catch(err)
    {
        res.status(400).send({ success: false, error:err.message});
    }
})
userRouter.get("/user/connections",userAuthentication,async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const connectionRequest=await ConnectionRequest.find({
            $or:[
                {toUserId:loggedInUser._id,status:"accepted"},
                {fromUserId:loggedInUser._id,status:"accepted"},
            ]
        })
        .populate("fromUserId",USER_SAFE_DATA)
        .populate("toUserId",USER_SAFE_DATA);
        const data=connectionRequest.map((row)=>{
            if(row.fromUserId._id.toString()===loggedInUser._id.toString())
            {
                return row.toUserId;
            }
            return row.fromUserId;
        })
        res.json({ success: true, message:"connections fetch successfully",data:data});
    }
    catch(err)
    {
        res.status(400).send({ success: false, error:err.message});
    }
})
userRouter.get("/feed",userAuthentication,async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const page=parseInt(req.query.page)||1;
        let limit=parseInt(req.query.limit)||10;
        limit=limit>50?50:limit;
        const skip=(page-1)*limit;
        const connectionRequests=await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id},
                {toUserId:loggedInUser._id}
            ]
        }).select("fromUserId toUserId");
        const hideUsersFromFeed=new Set();
        connectionRequests.forEach((req)=>{
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        })
        const users=await User.find({
            $and:[
                {_id:{$nin:Array.from(hideUsersFromFeed)}},
                {_id:{$ne:loggedInUser._id}},
            ]
        })    
        .select(USER_SAFE_DATA)
        .skip(skip)
        .limit(limit)
        res.status(200).json({ success: true, message:"feed fetch successfully", data: users });
    }
    catch(err){
        res.status(400).send({ success: false, error:err.message});
    }
})
module.exports={
    userRouter
}
