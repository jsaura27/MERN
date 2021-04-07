const express = require("express");
const expressLayout = require("express-ejs-layouts");
const flash = require("connect-flash");
const expressSession = require("express-session");
const methodOveride = require("method-override");
const cors = require("cors");
const passport = require("passport");

const app = express();

// Passport Config
require("./config/passport")(passport);

//DB Config
const CONNECTDB = require("./config/db");

//Connect to MongoDB ATLAS
CONNECTDB();

//EJS
app.use(expressLayout);
app.set("view engine", "ejs");

app.use(express.json());
// app.use(cookieParser("foo"));

//bodyParser
//bodyParser
app.use(express.urlencoded({ extended: false }));

//public add

app.use(express.static("public"));
app.use(cors("*"));

//method overide to send a put request
app.use(methodOveride("_method"));

//Express session
app.use(
  expressSession({
    secret: "foo",
    resave: false,
    cookie: {
      expires: false,
      // domain: config.cookie.domain
    },
    saveUninitialized: false,
  })
);

//Passport
app.use(passport.initialize());
app.use(passport.session());

//Connect flash
app.use(flash());

//Global variables for different messages (maybe add this in a separate file)
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.delete_msg = req.flash("delete_msg");
  next();
});

/* ROUTES */

app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

const port = process.env.PORT || 3000; //port setting
app.listen(port, () => console.log("App listening on port " + port));
