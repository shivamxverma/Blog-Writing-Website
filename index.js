const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoUri = process.env.MongoDbUrl;
const port = 8000;
mongoose.connect(mongoUri).then(()=>{
  console.log('MongoDb is connected');
});

const userRouter = require('./routes/user');
const CheckForAuthenticationCookie = require('./middleware/authentication');

app.set("view engine", "ejs");
app.set ("views", path.resolve("./views"));
app.use(express.urlencoded({extended:false}));

app.use(cookieParser());
app.use(CheckForAuthenticationCookie("token"));

app.get('/',(_,res)=>{
  res.render('home',{
    user : _.user,
  });
})

app.use("/user",userRouter);

app.listen(port,()=>{
  console.log('connecting to the server');
})

