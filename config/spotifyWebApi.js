const SpotifyWebApi = require('spotify-web-api-node');

require("dotenv").config();


const spotifyApi = new SpotifyWebApi({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI
});

module.exports = spotifyApi;