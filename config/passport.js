const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
const mongoose = require("mongoose");
const port = process.env.PORT || 3001;

const authCallbackPath = "/auth/spotify/callback";

require("dotenv").config();

const dbSpotify = require("../models");
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {

    // keep logged in
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    // callback user obj
    passport.use(
        new SpotifyStrategy(
            {
                clientID: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                callbackURL: "http://localhost:" + port + authCallbackPath,
            },
            function (accessToken, refreshToken, expires_in, profile, done) {

                process.nextTick(function () {
                    return done(null, profile);
                });

            }));
});





module.exports = passport;