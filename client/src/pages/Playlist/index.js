import React, { Component, useEffect, useState } from "react";
import API from "../../utils/API";
import ProfileImg from "../../components/ProfileImg";
import PlaylistItem from "../../components/PlaylistItem";

class Previous extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: "",
            img: "",
            playlistUsers: []
        };
        // this.createNewCollection = this.createNewCollection.bind(this) // bind method

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

                console.log(this.state.user);

                this.loadUserPlaylists(this.state.user.id)
            })
    };

    loadPlaylistUsers(id) {
        API.getUserPlaylists(id)
            .then(res => {
                console.log("INDEX");
                console.log(res.data)

                this.setState({ playlists: res.data });
                console.log("state");
                console.log(this.state.playlists);
            })
    }

    // need to add users to one of the playlists, add loadPlaylistUsers to API, idk recheck spotify.js
    render() {
        return (
            <div>
                <ProfileImg img={this.state.img}></ProfileImg>

                <h1>{this.state.user.displayName}'s Playlists</h1>

                <ul>
                    {this.state.playlists.map(playlist => (
                        <PlaylistItem
                            key={playlist._id}
                            id={playlist._id}
                            name={playlist.playlistName}
                        />
                    ))}
                </ul>
            </div >
        );
    }
}


export default Previous;
