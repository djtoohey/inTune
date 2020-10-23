const SpotifyWebApi = require('spotify-web-api-node');

require("dotenv").config();


const spotifyApi = new SpotifyWebApi({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: "https://djtoohey-intune.herokuapp.com/auth/spotify/callback"
});

module.exports = spotifyApi;