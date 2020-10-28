const SpotifyWebApi = require('spotify-web-api-node');

require("dotenv").config();


const spotifyApi = new SpotifyWebApi({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: "http://localhost:3001/auth/spotify/callback"
});

module.exports = spotifyApi;