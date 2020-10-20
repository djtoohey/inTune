const router = require("express").Router();
const passport = require("passport");
const Spotify = require("../../models/spotify");
require("../../config/passport");

module.exports = function (app) {
    app.get('/auth/', (req, res) => {
        res.send(`Hello world ${req.user.displayName}`)
    })
    app.get('/auth/error', (req, res) => res.send('Unknown Error'))

    app.get('/auth/spotify', passport.authenticate('spotify', {
        scope: ["user-read-email", "user-read-private"],
        showDialog: true,
    }));

    app.get("/account", ensureAuthenticated, function (req, res) {
        res.json(req.user)
    })

    app.get('/auth/spotify/callback', passport.authenticate('spotify', { failureRedirect: '/auth/error' }),
        function (req, res) {
            // console.log(req.user._json)
            res.redirect("http://localhost:3000/select");

            // res.json(req.user.displayName);
        });


    app.post("/api/users", function (req, res) {
        const newUser = req.body;
        console.log(newUser);
        Spotify.create({
            ownerId: newUser.ownerId,
            ownerUserName: newUser.ownerUserName,
            playlistName: newUser.playlistName,
            userIds: []
        }).then(dbUser => {
            res.json(dbUser);

        })
    })

    app.get('/api/playlists/:id', function (req, res) {
        console.log("req.params.id: " + req.params.id)
        const id = req.params.id
        Spotify.find({ ownerId: id }, function (err, playlists) {
            // console.log(playlists);
            res.json(playlists);
        })
        // search for data that all owner id === req.params.id
        // return it, then in front end, make a list out of it all

        // once clicked, new page (/playlists/userid/PLAYLISTNAME OR _id)
        // on new page, all users are in it, can remove and add with buttons
        // THEN WE CREATE MAGIC (the playlist :D)
        //  this will probs be in a new func at this point, if not several 
    });



    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect("/select");
    }
}
