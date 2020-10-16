const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;

const port = process.env.PORT || 3001;
const authCallbackPath = "/auth/spotify/callback";

const db = require("../models");

require("dotenv").config();

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
            // User.findOrCreate({ spotifyId: profile.id }, function(err, user) {
            //     return done(err, user);

            // const newUser = new db.Spotify({
            //     username: profile.displayName,
            //     profilePic: profile.photos[0]
            // });
            // newUser.save().then
            db.Spotify.create({
                username: profile.displayName,
                profilePic: profile.photos[0]
            })
                .then(dbUser => {
                    console.log(dbUser);

                })
                .then(() => {
                    process.nextTick(function () {
                        return done(null, profile);
                    });
                })
                .catch(err => {
                    console.error(err);
                    process.exit(1);
                });

        }
    )
);

module.exports = passport;