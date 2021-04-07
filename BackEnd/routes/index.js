const express = require("express");
const router = express.Router();
const passport = require("passport");
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
//Welcome Page
router.get("/", forwardAuthenticated, (req, res) => res.render("welcome"));

//Dashboard Page

router.get("/dashboard", ensureAuthenticated, (req, res) =>
  res.render("dashboard", {
    user: req.user,
    message: req.flash("dashboardMessage"),
  })
);

module.exports = router;
