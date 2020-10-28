import React, { Component } from "react";

import Main from "./pages/Test";
import Login from "./pages/Login";

import "./App.css";

class App extends Component {


    state = {
        token: ""
    };

    componentDidMount() {
        this.setState({ token });
    }

    render() {
        const { token } = this.state;
        return (

            <div>
                {token ? <Main /> : <Login />}

            </div>
        );
    }
}


export default App;
