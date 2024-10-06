require("dotenv").config();
const express = require("express");
const app = express();

// Middlewares
const sessionMiddleware = require("./middleware/sessionMiddleware");
const passport = require("./config/passportConfig");
const authRoutes = require("./routes/authRoutes");

const PORT = process.env.PORT || 8000;

// Apply middlewares
sessionMiddleware(app);
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(authRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});