const express = require("express");
const passport = require("../config/passportConfig");

const router = express.Router();

// Initial Google OAuth login
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google OAuth callback
router.get("/auth/google/callback", passport.authenticate("google", {
    failureRedirect: "/login"
}), (req, res) => {
    const token = req.user.token; // Get JWT token from user

    // Redirect to client with the JWT token
    res.redirect(`${process.env.CLIENT_URL}/?token=${token}`);
});

// Check if login was successful
router.get("/login/success", (req, res) => {
    if (req.user) {
        res.status(200).json({ message: "User has been logged in", user: req.user });
    } else {
        res.status(400).json({ message: "Not Authorized" });
    }
});

// Logout
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect(`${process.env.CLIENT_URL}/login`);
    });
});

module.exports = router;
