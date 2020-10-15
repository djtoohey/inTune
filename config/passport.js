const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;

const port = process.env.PORT || 3001;
const authCallbackPath = "/auth/spotify/callback";

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

            process.nextTick(function () {
                return done(null, profile);
            });
        }
    )
);

module.exports = passport;