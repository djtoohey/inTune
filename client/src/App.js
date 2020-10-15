import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import logo from "./logo.svg";

import "./App.css";

import Start from "./pages/Start";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Select from "./pages/Select";
import NewSet from "./pages/NewSet";

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path={"/"}>
                        <Start />
                    </Route>
                    <Route exact path={"/login"}>
                        <Login />
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
                    <Route exact path={"/newset"}>
                        <NewSet />
                    </Route>
                    {/* <Route>
                        <NoMatch />
                    </Route> */}
                </Switch>
            </div>
        </Router>
    );
}


export default App;
