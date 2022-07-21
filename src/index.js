const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const ejs = require("ejs");
const config = require("../config/default.json");
require("dotenv").config();

const {
  loginRouter,
  dashboardRouter,
  registerRouter,
} = require("./routers");

app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json());

//Set Route Path for Static Files
app.use("/public", express.static("../public"));

//BodyParser Initialized
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//Routes...
app.use("/", loginRouter);
app.use("/dashboard", dashboardRouter);
app.use("/register", registerRouter);

//404 page not found error for non existing routes
app.get("*", function (req, res) {
  res.render("error404");
});

app.listen(process.env.APP_PORT || config.app.port, () => {
  console.log(
    `Server is up and running on port ${
      process.env.APP_PORT || config.app.port
    }`
  );
});