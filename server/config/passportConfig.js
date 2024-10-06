const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const jwt = require("jsonwebtoken");
const { ROLES } = require("./constants");
const { PrismaClient } = require('@prisma/client');
const clientID = process.env.CLIENT_ID || '';
const clientSecret = process.env.CLIENT_SECRET || '';

const prismaClient = new PrismaClient();

passport.use(
    new OAuth2Strategy({
        clientID,
        clientSecret,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"]
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            if (!profile || !profile.emails || profile.emails.length === 0) {
                return done(new Error("Profile or email not found"), null);
            }

            let user = await prismaClient.user.findUnique({
                where: { email: profile.emails[0].value }
            });

            if (!user) {
                let role = ROLES.NORMAL; // Default role

                // Check email and assign the admin role
                if (profile.emails[0].value === process.env.EMAIL_FOR_ADMIN) {
                    role = ROLES.ADMIN;
                }

                user = await prismaClient.user.create({
                    data: {
                        googleId: profile.id,
                        displayName: profile.displayName,
                        email: profile.emails[0].value,
                        image: profile.photos?.[0]?.value || null,
                        role
                    }
                });
            }

            user.token = jwt.sign(
                { id: user.id, email: user.email, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            return done(null, user);
        } catch (error) {
            return done(error, null);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;
