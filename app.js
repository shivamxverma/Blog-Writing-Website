const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const Blog = require("./models/blog");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoUri = process.env.MONGO_URL;
const port = process.env.PORT || 8000;
mongoose.connect(mongoUri).then(() => {
  console.log("MongoDb is connected");
});

const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
// const CheckForAuthenticationCookie = require("./middleware/authentication");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
// app.use(CheckForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.use("/user", userRouter);
app.use("/blog", blogRouter);
app.get("/", async (req, res) => {
  const allblogs = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allblogs,
  });
});

app.listen(port, () => {
  console.log("connecting to the server");
});
