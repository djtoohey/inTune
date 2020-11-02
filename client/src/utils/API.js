import axios from "axios";

require("dotenv").config();

export default {
    // Gets user
    start: function () {
        return axios.get("/login");
    },
    getUser: function () {
        return axios.get("/account");
    },
    removeUserFromPlaylist: function (id, playlistId) {
        return axios.delete("/api/playlistUser/" + id + "/" + playlistId);
    },
    // Deletes the book with the given id
    // deleteBook: function (id) {
    //     return axios.delete("/api/books/" + id);
    // },
    // adds new playlist to database
    addNewUserSet: function (newUserSet) {
        return axios.post("/api/users", newUserSet);
    },
    // gets playlists owned to userId
    getUserPlaylists: function (userId) {
        return axios.get("/api/playlists/" + userId);
    },
    // gets users owned to playlistId
    getPlaylistUsers: function (playlistId) {
        return axios.get("/api/playlistData/" + playlistId);
    },
    addUserToPlaylist: function (playlistId, userId) {
        return axios.post("/api/playlist/" + playlistId + "/" + userId);
    },

    getUserName: function (id) {
        return axios.get("https://api.spotify.com/v1/users/" + id)
    },
    getUserSpotifyPlaylist: function (userId) {
        return axios.get("/api/spotify/playlist/" + userId);
    },
    getPlaylistSongs: function (playlistId) {
        return axios.get("/api/spotify/songs/" + playlistId);
    },
    makePlaylist: function (playlistIds) {
        return axios.post("/api/spotify/playlist/", playlistIds);
    },
    fillPlaylist: function (playlistUrl) {
        return axios.post("/api/spotify/fillplaylist/", playlistUrl);
    }
};
