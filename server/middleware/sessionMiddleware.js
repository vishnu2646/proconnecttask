const cors = require("cors");
const session = require("express-session");

const sessionMiddleware = (app) => {
    // CORS middleware
    app.use(cors({
        origin: process.env.CLIENT_URL,
        methods: "GET,POST,PUT,DELETE",
        credentials: true
    }));

    // Session middleware
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    }));
};

module.exports = sessionMiddleware;
