
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
            {/* <Route>
                        <NoMatch />
                    </Route> */}
        </Switch>
    </div>
</Router>