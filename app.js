//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

const app = express();

mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/*Creating a USER DATABASE */
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

userSchema.plugin(encrypt, {
  secret: process.env.SECRET,
  encryptedFields: ["password"],
});

const User = mongoose.model("User", userSchema);

/*Creating a USER DATABASE */
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res, next) => {
  res.render("home");
});

app.get("/login", (req, res, next) => {
  res.render("login");
});

app.get("/register", (req, res, next) => {
  res.render("register");
});

app.post("/register", (req, res, next) => {
  const newUser = new User({
    email: req.body.username,
    password: req.body.password,
  });
  newUser.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.render("secrets");
    }
  });
});

app.post("/login", (req, res, next) => {
  const userName = req.body.username;
  const password = req.body.password;
  User.findOne({ email: userName }, (err, foundUser) => {
    if (err) {
      console.log(err);
    } else {
      if (userName === foundUser.email && password === foundUser.password) {
        res.render("secrets");
      } else {
        res.send("<h1>Incorrect Username or Password</h1>");
      }
    }
  });
});

app.listen(3000, () => {
  console.log("Server is up on PORT 3000.");
});
