const router = require("express").Router();
const axios = require("axios");
const passport = require("passport");
const Spotify = require("../../models/spotify");
const spotifyApi = require("../../config/spotifyWebApi");
const request = require("request");
const { json } = require("express");

const PORT = process.env.PORT || 3001;


require("../../config/passport");

const SELECT_REDIRECT = "http://localhost:3000/select"

module.exports = function (app) {
    app.get('/auth/', (req, res) => {
        res.send(`Hello world ${req.user.displayName}`)
    })
    app.get('/auth/error', (req, res) => res.send('Unknown Error'))

    app.get('/auth/spotify', passport.authenticate('spotify', {
        scope: ["user-read-email", "user-read-private", "playlist-modify-public", "playlist-modify-private"],
        showDialog: true,
    }));

    app.get("/account", ensureAuthenticated, function (req, res) {
        res.json(req.user)
    })

    app.get('/auth/spotify/callback', passport.authenticate('spotify', { failureRedirect: '/auth/error' }),
        function (req, res) {
            // console.log(req.user._json)
            res.redirect(SELECT_REDIRECT);
        });


    app.post("/api/users", function (req, res) {
        const newUser = req.body;
        // console.log(newUser);
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
        // console.log("req.params.id: " + req.params.id)
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

    app.get('/api/playlistData/:id', function (req, res) {

        const playlistId = req.params.id;
        // console.log(playlistId);
        Spotify.findById(playlistId, function (err, data) {
            // console.log(data)
            res.json(data);
        })
    });

    app.delete("/api/playlistUser/:id/:playlistId", function (req, res) {
        const userId = req.params.id;
        const playlistId = req.params.playlistId;
        // console.log(userId, playlistId);
        let userArr = [];
        let newUserArr = [];
        Spotify.findById(playlistId, function (err, data) {
            // console.log(data.userIds)
            userArr = data.userIds
        })
            .then(() => {
                // console.log("inside then " + userArr)
                userArr.forEach(user => {
                    if (user !== userId) {
                        newUserArr.push(user);
                    }
                });

                // console.log(newUserArr);

            })
            .then(() => {
                Spotify.findByIdAndUpdate(playlistId, { userIds: newUserArr })
                    .then(dbUpdate => {
                        // console.log(dbUpdate);
                        res.json(dbUpdate);
                    })
            })
    })


    app.post("/api/playlist/:playlistId/:userId", function (req, res) {
        const userId = req.params.userId;
        const playlistId = req.params.playlistId;

        let userArr = [];
        Spotify.findById(playlistId, function (err, data) {
            // console.log(data.userIds)
            userArr = data.userIds
        })
            .then(() => {
                // console.log("inside then " + userArr)
                userArr.push(userId)
            })
            .then(() => {
                Spotify.findByIdAndUpdate(playlistId, { userIds: userArr })
                    .then(dbUpdate => {
                        // console.log(dbUpdate);
                        res.json(dbUpdate);
                    })
            })
    })

    app.get("/api/spotify/playlist/:userId", function (req, res) {
        const userId = req.params.userId;

        spotifyApi.getUserPlaylists(userId)
            .then(playlists => {
                res.json(playlists.body.items);
            })
        // spotifyApi.getPlaylist("37i9dQZF1EuQKhTTAFKP2c")
        //     .then(data => console.log(data))
    })

    app.get("/api/spotify/songs/:playlistId", function (req, res) {
        const playlistId = req.params.playlistId;

        spotifyApi.getPlaylistTracks(playlistId)
            .then(songs => {
                // console.log(songs.body.items)
                res.json(songs.body.items)
            })
    })

    app.post("/api/spotify/playlist/", function (req, res) {
        const data = req.body;
        const songs = data.songs;
        const id = data.id;
        const playlistName = data.playlistName;

        const passableSongs = [];
        songs.forEach(song => {
            passableSongs.push("spotify:track:" + song);
        });


        let authOptions = {
            url: 'https://api.spotify.com/v1/users/' + id + '/playlists',
            body: JSON.stringify({
                'name': playlistName,
                'public': true
            }),
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + spotifyApi.getAccessToken(),
                'Content-Type': 'application/json',
            }
        };

        request.post(authOptions, function (error, response, body) {
            let obj = JSON.parse(body);

            addMutualSongs(obj.id, passableSongs, res);
        })
    })

    function addMutualSongs(playlistId, songs, res) {
        let authOptions = {
            url: 'https://api.spotify.com/v1/playlists/' + playlistId + '/tracks',
            body: JSON.stringify({
                "uris": songs
            }),
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + spotifyApi.getAccessToken(),
                'Content-Type': 'application/json',
            }
        };

        request.post(authOptions, function (error, response, body) {
            let obj = JSON.parse(body);
            // console.log(obj);

            res.json(playlistId);
            // https://open.spotify.com/playlist/
        })
    }

    app.post("/api/spotify/fillplaylist/", function (req, res) {
        const data = req.body;
        // console.log(data.allSongs)

        const songs = data.allSongs;
        const playlistId = data.id;

        let passableSongs = [];
        songs.forEach(song => {
            passableSongs.push("spotify:track:" + song);
        });
        let chunk = 100;
        for (let i = 0; i < passableSongs.length; i += chunk) {
            const tempArray = passableSongs.slice(i, i + chunk);
            // console.log(tempArray)

            let authOptions = {
                url: 'https://api.spotify.com/v1/playlists/' + playlistId + '/tracks',
                body: JSON.stringify({
                    "uris": tempArray
                }),
                dataType: 'json',
                headers: {
                    'Authorization': 'Bearer ' + spotifyApi.getAccessToken(),
                    'Content-Type': 'application/json',
                }
            };

            request.post(authOptions, function (error, response, body) {
                let obj = JSON.parse(body);
                // console.log(obj);

            })
        }



        res.json("https://open.spotify.com/playlist/" + playlistId);

    })

    app.get("/port", function (req, res) {
        res.json(PORT);
    })

    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect("/select");
    }
}
