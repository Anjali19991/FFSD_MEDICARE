const express = require("express");
const path = require("path");
const cookie = require("cookie-parser");
const authController = require("./controllers/authController");
const userController = require("./controllers/userController");
const User = require("./models/user_model");
const adminController = require("./controllers/adminController");

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(cookie());
app.use(express.json());
// app.use(express.static("./public"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.get("/", authController.loggedIn, (req, res) => {
  console.log(req.user);
  if (req.user) {
    res.render("index", { status: "loggedIn", user: req.user });
  } else {
    res.render("index", { status: "no", user: "nothing" });
  }
});

app.get("/profile", authController.loggedIn, (req, res) => {

  
  if (req.user) {
    res.render("profile", { status: "loggedIn", user: req.user });
  } else {
    res.render("index", { status: "no", user: "nothing" });
  }
});

app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/about_page", (req, res) => {
  res.render("about_page");
});

app.get("/blogs", (req, res) => {
  res.render("blog");
});

app.get("/contact_us", (req, res) => {
  res.render("contact_us");
});

app.get("/registrations", (req, res) => {
  res.render("registrations");
});

app.get("/dashboard",adminController.dashboard_details, (req, res) => {
  if (req.count_details) {
    res.render("dashboard", { status: "loggedIn", count_details: req.count_details });
  } else {
    res.render("index");
  }
  res.render("dashboard");
});

app.get("/logout", authController.logout);
// app.post("/signup", authControllers.signup);

app.post("/api/register", authController.signup);
app.post("/api/login", authController.login);
app.patch("/api/update_user", userController.update_details);

module.exports = app;
