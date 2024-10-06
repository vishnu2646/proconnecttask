require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8000;
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const jwt = require("jsonwebtoken");

const clientid = process.env.CLIENT_ID || ''
const clientsecret = process.env.CLIENT_SECRET || ''

const { PrismaClient } = require('@prisma/client');
const prismaClient = new PrismaClient();

app.use(cors({
    origin:"http://localhost:3000",
    methods:"GET,POST,PUT,DELETE",
    credentials:true
}));

app.use(express.json());

// setup session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true
}))

// setuppassport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new OAuth2Strategy({
        clientID:clientid,
        clientSecret:clientsecret,
        callbackURL:"/auth/google/callback",
        scope:["profile","email"]
    },
    async(accessToken,refreshToken,profile,done)=>{
        try {
            let user = await prismaClient.user.findUnique({
                where: { email: profile.emails[0].value }
            });

            if(!user){
                let role = "normal"; // Default role

                // Check email and assign the admin role
                if (profile.emails[0].value === "priyanvishnu15@gmail.com") {
                    role = "admin";
                }

                user = await prismaClient.user.create({
                    data: {
                        googleId:profile.id,
                        displayName:profile.displayName,
                        email:profile.emails[0].value,
                        image:profile.photos[0].value,
                        role: role
                    }
                });
            }

            user.token = jwt.sign(
                { id: user.id, email: user.email, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            return done(null,user)
        } catch (error) {
            return done(error,null)
        }
    }
    )
)

passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
});

// initial google ouath login
app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));

app.get("/auth/google/callback", passport.authenticate("google", {
    failureRedirect: "/login"
}), (req, res) => {
    // Successful authentication, redirect to the client with the JWT token
    const token = req.user.token; // Get JWT token from user

    // Send token to the client (you can send it as a query param or in the response body)
    res.redirect(`http://localhost:3000/?token=${token}`);
});

app.get("/login/sucess",async(req,res)=>{
    if (req.user) {
        res.status(200).json({message:"user has been LoggedIn",user:req.user})
    } else {
        res.status(400).json({message:"Not Authorized"})
    }
})

app.get("/logout",(req,res,next)=>{
    req.logout(function(err){
        if(err) { return next(err) }
        res.redirect("http://localhost:3000/login");
    });
})

app.listen(PORT,()=>{
    console.log(`server start at port no ${PORT}`)
})