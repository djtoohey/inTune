import React, { Component, useEffect, useState } from "react";
import API from "../../utils/API";
import ProfileImg from "../../components/ProfileImg";
import PlaylistItem from "../../components/PlaylistItem";
import UserItem from "../../components/UserItem";

class Playlist extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: "",
            img: "",
            playlistId: "",
            playlistName: "",
            playlistUsers: [],
            spotifyUserId: "",
            newUserUrl: "",
            arrayOfPlaylists: [],
            arrayOfSongs: [],
            songsToBeAddedToNewPlaylist: [],
            allSongs: [],
            playlistUrl: ""
        };
        this.getUserId = this.getUserId.bind(this) // bind method
        this.getUserPlaylistArrays = this.getUserPlaylistArrays.bind(this) // bind method

    };

    // const [user, setUser] = useState({});
    // const [img, setImg] = useState("");
    componentDidMount() {
        this.loadUser()
    };

    loadUser() {
        API.getUser()
            .then(res => {

                this.setState({ user: res.data });
                // console.log(res.data.displayName);
                this.setState({ img: res.data._json.images[0].url })

                // console.log(this.state.user.id);

                // window.location.href... gotten from 
                // https://stackoverflow.com/questions/4758103/last-segment-of-url-in-jquery
                this.setState({ playlistId: window.location.href.substring(window.location.href.lastIndexOf('/') + 1) })
                // console.log(this.state);
                this.loadPlaylistUsers(this.state.playlistId)
            })
    };

    loadPlaylistUsers(id) {
        API.getPlaylistUsers(id)
            .then(res => {
                // console.log("INDEX");
                // console.log(res.data);
                this.setState({ playlistName: res.data.playlistName });
                this.setState({ playlistUsers: res.data.userIds })
            })
    }

    handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        let value = event.target.value;
        const name = event.target.name;

        // console.log(value, name);
        // Updating the input's state
        this.setState({
            [name]: value
        });

    };

    getUserId() {
        // console.log(this.state.newUserUrl)
        let newSpotifyUserId = this.state.newUserUrl.substring(this.state.newUserUrl.lastIndexOf('user/') + 5);
        let remove = this.state.newUserUrl.substring(this.state.newUserUrl.lastIndexOf('?si'));
        newSpotifyUserId = newSpotifyUserId.replace(remove, " ");
        // console.log(newSpotifyUserId);
        // console.log(typeof (newSpotifyUserId));
        this.setState({ spotifyUserId: newSpotifyUserId }, () => {
            this.addUser();
        });

    };

    addUser() {
        // console.log("adduser")
        // console.log(this.state);
        API.addUserToPlaylist(this.state.playlistId, this.state.spotifyUserId)
            .then(res => console.log(res));
    }

    getUserPlaylistArrays() {
        // for (i < this.state.playlistUsers.length; i++;) {

        // console.log(this.state.playlistUsers.length);
        for (let i = 0; i < this.state.playlistUsers.length; i++) {
            const user = this.state.playlistUsers[i];
            // console.log(i);

            // } this.state.playlistUsers.forEach((user) => {
            // console.log(user);
            API.getUserSpotifyPlaylist(user)
                .then(res => {
                    const playlists = res.data;
                    for (let j = 0; j < playlists.length; j++) {
                        const playlist = playlists[j];
                        if (playlist.name.toLowerCase().includes("work")) {
                            let oldArr = this.state.arrayOfPlaylists;
                            this.setState({ arrayOfPlaylists: oldArr.concat(playlist) });
                        }
                    }
                    // console.log(res.data) 
                })

                .then(() => { if (i + 1 === this.state.playlistUsers.length) { this.getUserSongsArrays(); } })
        };
    }

    getUserSongsArrays() {
        for (let i = 0; i < this.state.arrayOfPlaylists.length; i++) {
            const playlist = this.state.arrayOfPlaylists[i];

            // console.log(playlist.id)
            API.getPlaylistSongs(playlist.id)
                .then(res => {
                    // console.log(res.data);
                    const playlistSongs = res.data;
                    // console.log(playlistSongs.track.id)

                    let songArr = [];
                    playlistSongs.forEach(songs => {
                        // console.log(songs.track.id);
                        songArr.push(songs.track.id);
                        this.state.allSongs.push(songs.track.id);
                    });
                })
                .then(() => {
                    if (i + 1 === this.state.arrayOfPlaylists.length) {
                        this.setState({ songsToBeAddedToNewPlaylist: this.compareArrays.apply(this, this.state.arrayOfSongs) });


                        this.makePlaylist();
                    }
                })
        }
    }


    makePlaylist() {
        const userAndSongs = {
            songs: this.state.songsToBeAddedToNewPlaylist,
            id: this.state.user.id,
            playlistName: this.state.playlistName
        }
        API.makePlaylist(userAndSongs)
            .then(res => {
                // console.log(res.data)
                this.finishPlaylist(res.data)
            })
    }

    finishPlaylist(playlistId) {
        console.log("HERE")
        console.log(this.state.allSongs);
        let obj = {
            id: playlistId,
            allSongs: this.state.allSongs
        };

        API.fillPlaylist(obj)
            .then(res => {
                console.log(res.data)

                window.open(res.data);
            })
        // res should === the playlist url :D
    }

    compareArrays(args) {
        let fullArr = [];
        let finalArr = [];
        // console.log(arguments);
        // store the arguments inside a single array
        for (let count = 0; count < arguments.length; count++) {
            // console.log(count, arguments[count]);
            fullArr[count] = arguments[count];
        }
        // loop through the array of arrays, comparing array i to array j
        for (let i = 0; i < fullArr.length; i++) {
            fullArr[i].forEach(function (e) {
                for (let j = 0; j < fullArr.length; j++) {
                    if (i !== j) {
                        if (fullArr[j].includes(e) && !finalArr.includes(e)) finalArr.push(e);
                    }
                }
            });
        }

        return finalArr;
    }

    // need to add users to one of the playlists, add loadPlaylistUsers to API, idk recheck spotify.js 
    render() {
        return (
            <div>
                <ProfileImg img={this.state.img}></ProfileImg>

                <h1>{this.state.playlistName}</h1>

                <ul>
                    {this.state.playlistUsers.map(user => (
                        <UserItem
                            key={user}
                            id={user}
                            displayName={user}
                            playlistId={this.state.playlistId}
                        />
                    ))}

                    <input
                        name="newUserUrl"
                        placeholder="URL of New User"
                        onChange={this.handleInputChange}
                        value={this.state.newUserUrl}></input>
                    <button onClick={this.getUserId}>Add new user</button>
                </ul>

                <p></p>
                <button id="genPlayBtn" onClick={() => {
                    this.getUserPlaylistArrays();
                    document.getElementById("genPlayBtn").disabled = true;
                    document.getElementById("loading").style.visibility = "visible";
                    // document.getElementById("confirmBtn").disabled = false;
                }}>
                    generate playlist</button>
                <p id="loading" style={{ visibility: "hidden" }} >LOADING</p>
            </div >
        );
    }
}


export default Playlist;
