import React, { Component, useEffect, useState } from "react";
import API from "../../utils/API";
import ProfileImg from "../../components/ProfileImg";
import PlaylistItem from "../../components/PlaylistItem";
import UserItem from "../../components/UserItem";

class Previous extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: "",
            img: "",
            playlistId: "",
            playlistName: "",
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

                // console.log(this.state.user);

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
                console.log("INDEX");
                console.log(res.data);
                this.setState({ playlistName: res.data.playlistName });
                this.setState({ playlistUsers: res.data.userIds })
            })
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
                        // remove btn here

                    ))}
                    <button>Add new user</button>
                </ul>

                <p></p>
                <button>generate playlist</button>
            </div >
        );
    }
}


export default Previous;
