const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoUri = process.env.MongoDbUrl;
const port = 8000;
mongoose.connect(mongoUri).then(()=>{
  console.log('MongoDb is connected');
});

const userRouter = require('./routes/user');

app.set("view engine", "ejs");
app.set ("views", path.resolve("./views"));
app.use(express.urlencoded({extended:false}));

app.get('/',(req,res)=>{
  res.render('home');
})

app.use("/user",userRouter);

app.listen(port,()=>{
  console.log('connecting to the server');
})

