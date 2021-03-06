import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

// import Main from "./pages/Test";
// import Login from "./pages/Login";

import Start from "./pages/Start";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Select from "./pages/Select";
import NewSet from "./pages/NewSet";
import Previous from "./pages/Previous";
import Playlist from "./pages/Playlist";
import Test from "./pages/Test";
import Test2 from "./pages/Test2";
import "./App.css";

class App extends Component {

    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path={"/"}>
                            <Start />
                        </Route>
                        <Route exact path={"/signup"}>
                            <Signup />
                        </Route>
                        <Route exact path={"/select"}>
                            <Select />
                        </Route>
                        <Route exact path={"/newset"}>
                            <NewSet />
                        </Route>
                        <Route exact path={"/previous"}>
                            <Previous />
                        </Route>
                        <Route path={"/playlist/"}>
                            <Playlist />
                        </Route>
                        <Route exact path={"/test"}>
                            <Test />
                        </Route>
                        <Route exact path={"/test2"}>
                            <Test2 />
                        </Route>
                        {/* <Route exact path={"/auth/spotify/"}>
                            <ren`>
                        </Route> */}
                        {/* <Route>
                        <NoMatch />
                    </Route> */}
                    </Switch>
                </div>
            </Router>
        )
    }


    // state = {
    //     token: ""
    // };

    // componentDidMount() {
    //     this.setState({ token: "A" });
    // }

    // render() {
    //     const { token } = this.state.token;
    //     return (

    //         <div>
    //             {token ? <Main /> : <Login />}

    //         </div>
    //     );
    // }
}


export default App;
