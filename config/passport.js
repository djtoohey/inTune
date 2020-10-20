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
                // console.log(profile.id);
                // creates new userobj
                const newUser =
                {
                    username: profile.displayName,
                    profilePic: profile.photos[0]
                }
                // console.log(newUser);

                // finds all users
                dbSpotify.Spotify.find(function (err, users) {
                    if (err) return console.error(err);
                    // console.log(users);
                })
                    // then compares all users to new user
                    .then((users) => {
                        for (let i = 0; i < users.length; i++) {
                            const user = users[i];
                            // console.log(user)
                            if (!newUser.id === user.id) {
                                // if they dont exist, create
                                dbSpotify.Spotify.create({
                                    id: profile.id,
                                    username: profile.displayName,
                                    profilePic: profile.photos[0]
                                }).then(dbUser => {
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
                            else {
                                process.nextTick(function () {
                                    return done(null, profile);
                                });
                            }
                        }
                    })
            }));
});





module.exports = passport;