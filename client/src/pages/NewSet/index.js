import React, { Component, useEffect, useState } from "react";
import { render } from "react-dom";
import ProfileImg from "../../components/ProfileImg";
import API from "../../utils/API";


class NewSet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: "",
            img: "",
            newPlaylistName: ""
        };
        this.createNewCollection = this.createNewCollection.bind(this) // bind method

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
            })
    };

    handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        let value = event.target.value;
        const name = event.target.name;

        // Updating the input's state
        this.setState({
            [name]: value
        });

    };



    createNewCollection(event) {
        event.preventDefault();


        API.addNewUserSet(
            {
                ownerId: this.state.user.id,
                ownerUsername: this.state.user.displayName,
                playlistName: this.state.newPlaylistName,
                userIds: []
            })
            .then(res => window.location.assign("/previous"))
    }

    // 
    render() {
        return (
            <div>
                <ProfileImg img={this.state.img}></ProfileImg>
                <div className="hero is-medium is-fluid">
                    <div className="hero-body container has-text-centered ">

                        
                        <h1 className="title has-text-white">NEW SET</h1>
                        <input className="input"
                            name="newPlaylistName"
                            placeholder="Name of Playlist"
                            onChange={this.handleInputChange}
                            value={this.state.newPlaylistName}
                        ></input>
                        <a href="/previous" className="button is-success"
                            onClick={this.createNewCollection}
                        >Submit
                
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}


export default NewSet;
