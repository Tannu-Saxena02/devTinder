const socket=require("socket.io");
const crypto=require("crypto");
const user = require("../models/user");
const { Chat } = require("../models/chat");
const getSecretRoomId=(userId,targetUserId)=>{
    return crypto
    .createHash("sha256")
    .update([userId,targetUserId].sort().join("$"))
    .digest("hex");
}
const initializeSocket=(server)=>{
    const io=socket(server,{
        cors:{
            origin:"http://localhost:5173",
        },
    });
    io.on("connection",(socket)=>{
        //handle events=>when client send the request to connection it connects for communication here
        socket.on("joinChat",({firstName,userId,targetUserId})=>{
            const roomId=getSecretRoomId(userId,targetUserId);
            console.log(firstName+" joined Room "+roomId);
            socket.join(roomId);
        });
        socket.on("sendMessage",async({firstName,userId,targetUserId,text})=>{
            try{
                 const roomId=getSecretRoomId(userId,targetUserId);
                console.log(firstName+"  "+text);

                //  TODO: check if userId & targetUserID both are friends
                let chat=await Chat.findOne({
                    participants:{$all:[userId,targetUserId]}
                });
                if(!chat){
                    chat=new Chat({
                        participants:[userId,targetUserId],
                        messages:[]
                    });
                }
                chat.messages.push({
                    senderId:userId,
                    text,
                });
                await chat.save();
                io.to(roomId).emit("messageReceived",{firstName,text});
            }
            catch(err){
                console.error("Error in sending message: ", err);
            }

        });
        socket.on("disconnect",()=>{});
    })
}
module.exports=initializeSocket;