const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spotifySchema = new Schema({
    username: String,
    profilePic: String,
});

const Spotify = mongoose.model("spotify", spotifySchema);

module.exports = Spotify;
