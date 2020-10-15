import React from "react";
import Btn from "../../components/Btn";


function Login() {
    return (
        <div>
            <h1>ON LOGIN</h1>
            <Btn text="login" loc="/select"></Btn>
            <Btn text="signup" loc="/signup"></Btn>

        </div>
    );
}


export default Login;
