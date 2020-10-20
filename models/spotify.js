const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spotifySchema = new Schema({
    ownerId: String,
    ownerUsername: String,
    playlistName: String,
    userIds: Array
});

const Spotify = mongoose.model("spotify", spotifySchema);

module.exports = Spotify;
