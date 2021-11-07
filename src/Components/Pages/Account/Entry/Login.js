import React, {useEffect, useState} from "react";
import {Col, Row} from "react-grid-system";
import { PrimaryButton, TextField} from "@fluentui/react";
import {Link, useHistory} from "react-router-dom";
import { getAPI} from "../../../../Core/Global/global.selectors";
import {connect} from "react-redux";
import { setUserData} from "../../../../Core/Authentication/authentication.action";
import {HttpTransportType, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import {setConnection} from "../../../../Core/Global/global.actions";
import {PulseLoader} from "react-spinners";

function Login(props){

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [loginError, setLoginError] = useState("");
    const [loading, setLoading] = useState(false);
    let history = useHistory();

    useEffect(() => {
       if(localStorage.getItem("ANTE_UP_SESSION_TOKEN") !== null){
           history.push("/account")
       }
    });
    const handlePassword = (e, value) => {
        setPassword(value);
        setPasswordError("");
    }
    const handleEmail = (e, value) => {
        setEmail(value);
        setEmailError("");
    }

    function CheckForErrors(){
        if(email===""||password===""){
            return "Please fill in all fields.";
        }
        if(emailError !== ""){
            return emailError;
        }
        else{
            return "";
        }
    }
    async function loginSuccess(connection, res){
        try{
            await connection.start();
            props.dispatch(setConnection(connection));
            props.dispatch(setUserData(email, res.data.response, res.data.token));

            connection.invoke("Login", res.data.token).then(() => console.log("success"));
            localStorage.setItem("ANTE_UP_SESSION_TOKEN", res.data.token);

            history.push("/account");
            setLoading(false);
            window.location.reload();
        }catch{
            console.log("Connection Failed")
        }
    }
    function Confirm(){
        if(CheckForErrors() === "") {
            if(props.api !== undefined) {
                setLoading(true);
                props.api.post("/account/login", {
                    password: password,
                    email: email
                }).then(res => {
                    let connection = new HubConnectionBuilder()
                        .withUrl("https://localhost:5001/antehub", {
                            skipNegotiation: true,
                            transport: HttpTransportType.WebSockets
                        })
                        .configureLogging(LogLevel.Information)
                        .withAutomaticReconnect()
                        .build();
                    loginSuccess(connection, res);
            }).catch(err => {
                    if(err.response.status === 500) {
                        setLoginError("Internal server error.")
                        setLoading(false);
                    }
                    else{
                        setLoginError(err.response.data);
                        setLoading(false);
                    }
                });}
        }
        else {
            setLoginError(CheckForErrors())
        }
    }

    return <div>
        <Row>
            <Col/>
            <Col sm={12} md={6} lg={4}>
                <div style={{alignContent:"center"}}>
                    <div style={{fontSize:"40px"}}>Login</div>
                    <TextField label="Email " required errorMessage={emailError}  onChange={handleEmail}/>
                    <TextField
                        label="Password"
                        type="password"
                        canRevealPassword
                        revealPasswordAriaLabel="Show password"
                        required
                        errorMessage={passwordError}
                        onChange={handlePassword}
                    />
                    <div style={{color:"#a4262c"}}>{loginError}</div>
                    <div>{loading ? <div style={{position:"fixed", top:"45%", left:"45%", overflowX:"hidden"}}>
                        <PulseLoader color={"#39ff13"} size={40}/>
                    </div> : ""}</div>
                    <PrimaryButton onClick={Confirm} style={{float:"right"}}>Login</PrimaryButton>
                    <Link to={"/passwordforgotten"}>Forgotten Password?</Link>
                    <br/>
                    <Link to={"/register"}>Don't have an account yet?</Link>
                </div>
            </Col>
            <Col/>
        </Row>
    </div>

}
const mapStateToProps = (state) => {
    return {
        api : getAPI(state)
    };
};

export default connect(mapStateToProps)(Login);