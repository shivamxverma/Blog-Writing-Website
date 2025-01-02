const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const port = 8000;
const app = express();

app.use(express.json());

app.use(express.urlencoded({extended:false}));

mongoose.connect('mongodb+srv://admin:12345@cluster0.leo9l.mongodb.net/').then(()=>{
  console.log('MongoDb is connected');
});

const userRouter = require('./routes/user');

app.set("view engine", "ejs");
app.set ("views", path.resolve("./views"));

app.use("/user",userRouter);

app.listen(port,()=>{
  console.log('connecting to the server');
})