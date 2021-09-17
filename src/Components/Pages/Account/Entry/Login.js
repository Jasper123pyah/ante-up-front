import React, {useEffect, useState} from "react";
import {Col, Row} from "react-grid-system";
import { PrimaryButton, TextField} from "@fluentui/react";
import {Link, useHistory} from "react-router-dom";
import {useCookies} from "react-cookie";
import { getAPI} from "../../../../Core/Global/global.selectors";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        api : getAPI(state)
    };
};

function Login(props){

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [loginError, setLoginError] = useState("");
    const [cookies, setCookie] = useCookies(["ANTE_UP_SESSION_TOKEN"]);
    const [loading, setLoading] = useState(false);
    let history = useHistory();

    useEffect(() => {
       if(cookies.ANTE_UP_SESSION_TOKEN !== undefined){
           history.push("/settings")
       }
    });
    const handlePassword = (e, value) => {
        setPassword(value);
        setPasswordError("");
    }
    const handleEmail = (e, value) => {
        setEmail(value);
        setEmailError("");
        if(!validateEmail(email)){
            setEmailError("Your email is invalid.")
        }
    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
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

    function Confirm(){
        if(CheckForErrors() === "") {
            if(props.api !== undefined) {
                setLoading(true);
                props.api.post("/account/login", {
                    password: password,
                    email: email
                }).then(res => {
                    if(res.data.response === "1"){
                        setLoginError("There is no account with this email.");
                        setLoading(false);
                    }
                    else if(res.data.response === "2"){
                        setLoginError("Incorrect password.");
                        setLoading(false);
                    }
                    else{
                        setCookie("ANTE_UP_SESSION_TOKEN", res.data.response);
                        history.push("/settings");
                        setLoading(false);
                    }
            })}
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
                    <div>{loading ? "Loading..." : ""}</div>
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

export default connect(mapStateToProps)(Login);