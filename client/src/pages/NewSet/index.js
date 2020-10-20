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
                console.log(this.user);
                this.setState({ user: res.data });
                // console.log(res.data.displayName);
                this.setState({ img: res.data._json.images[0].url })
                console.log(res.data);
                console.log(this.state.user);
            })
    };

    handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        let value = event.target.value;
        const name = event.target.name;

        console.log(value)
        console.log(name)
        // Updating the input's state
        this.setState({
            [name]: value
        });
        console.log(this.state.newPlaylistName)
        console.log(this)
    };



    createNewCollection(event) {
        event.preventDefault();

        console.log("button click");
        console.log(this);
        API.addNewUserSet(
            {
                ownerId: this.state.user.id,
                ownerUsername: this.state.user.displayName,
                playlistName: this.state.newPlaylistName,
                userIds: []
            }
        )
            .then(res => {
                console.log("test");
            })
    }



    // 
    render() {
        return (
            <div>
                {/* https://material-ui.com/components/slider/#slider-with-input-field */}

                <ProfileImg img={this.state.img}></ProfileImg>
                <h1>NEW SET</h1>
                <input
                    name="newPlaylistName"
                    placeholder="Name of Playlist"
                    onChange={this.handleInputChange}
                    value={this.state.firstName}
                ></input>
                <button onClick={this.createNewCollection}>Submit</button>
            </div>
        );
    }
}


export default NewSet;
