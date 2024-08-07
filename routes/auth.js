const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("../controllers/auth.controller");
router.get("/login", authController.login);
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
  }),
  (req, res) => {
    res.json({ status: "Done!" });
  }
);
module.exports = router;
