require('dotenv').config();
const express = require("express");
const app = express();
const { connectDB } = require("./config/database.js");
var cookieParser = require("cookie-parser");
var cors = require('cors')
const http= require("http");
// require("./utils/cronjobs.js"); to schedule cron jobs


const { authRouter }=require("./routes/auth.js")
const { profileRouter }=require("./routes/profile.js")
const { requestRouter }=require("./routes/request.js")
const { userRouter }=require("./routes/user.js");
const { otpRouter } = require("./routes/otp.js");
const  initializeSocket  = require("./utils/socket.js");
const chatRouter = require('./routes/chat.js');
const paymentRouter = require('./routes/payment.js');
const allowedOrigins = [
  'http://localhost:5173',             // For dev
  'https://devconnect.world'           // For production
];
app.use(cors({
  origin: 'http://localhost:5173',   // Allow frontend origin
  credentials: true                  // Allow cookies or credentials
}));

app.use(express.json()); // to parse JSON bodies request
app.use(cookieParser()); // to parse cookies
app.use('/uploads', express.static('uploads'));

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);
app.use("/",otpRouter);
app.use("/",chatRouter);
app.use("/",paymentRouter);
const server=http.createServer(app);
initializeSocket(server);


connectDB().then(() => {
    console.log("Database connection established");
    server.listen(process.env.PORT, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database cannot be established", err);
  });
