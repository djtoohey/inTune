const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spotifySchema = new Schema({
    // not too sure what to put here atm
});

const Spotify = mongoose.model("Spotify", spotifySchema);

module.exports = Spotify;
