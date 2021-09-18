import React, {useState} from "react";
import {Col, Row} from "react-grid-system";
import {PrimaryButton, TextField} from "@fluentui/react";
import {getAPI} from "../../../../Core/Global/global.selectors";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";

function Register(props){
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [registerError, setRegisterError] = useState("");

    let history = useHistory();

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    function CheckForErrors(){
        if(username===""||email===""||password===""||confirmPassword===""){
            return "Please fill in all fields.";
        }
        if(password !== confirmPassword){
            return "Passwords don't match.";
        }
        if(emailError !== ""){
            return emailError;
        }
        if(usernameError !== ""){
            return usernameError;
        }
        if(passwordError !== ""){
            return passwordError;
        }
        else{
            return "";
        }
    }
    function Confirm(){
        if(CheckForErrors() === "") {
            props.api.post("/account/register", {
                username: username,
                password: password,
                email: email
            }).then(res => {
                if(res.data === ""){
                    history.push("/login");
                }
                else{
                    setRegisterError(res.data);
                }
            })
        }
        else{
            setRegisterError(CheckForErrors)
        }
    }
    const handlePassword = (e, value) => {
        setPassword(value);
        setPasswordError("");
        if(password.length > 30){
            setPasswordError("Password can't be longer than 30 characters.")
        }
    }
    const handleUsername = (e, value) => {
        setUsername(value);
        setUsernameError("");
        if(username.length > 30){
            setUsernameError("Username can't be longer than 30 characters.")
        }
    }
    const handleEmail = (e, value) => {
        setEmail(value);
        setEmailError("");
        if(!validateEmail(email)){
            setEmailError("Your email is invalid.");
        }
    }
    const handleConfirmPassword = (e, value) => {
        setConfirmPassword(value);
    }
    return <div>
        <Row>
            <Col/>
            <Col sm={12} md={6} lg={4}>
                <div style={{alignContent:"center"}}>
                    <div style={{fontSize:"40px"}}>Register</div>
                    <TextField
                        label="Username"
                        required
                        errorMessage={usernameError}
                        onChange={handleUsername}/>
                    <TextField
                        label="Email"
                        required
                        errorMessage={emailError}
                        onChange={handleEmail}/>
                    <TextField
                        label="Password"
                        type="password"
                        canRevealPassword
                        revealPasswordAriaLabel="Show password"
                        required
                        errorMessage={passwordError}
                        onChange={handlePassword}
                    />
                    <TextField
                        label="Confirm Password"
                        type="password"
                        canRevealPassword
                        revealPasswordAriaLabel="Show password"
                        required
                        onChange={handleConfirmPassword}
                    />
                    <div style={{color:"#a4262c"}}>{registerError}</div>
                    <PrimaryButton style={{float:"right"}} onClick={Confirm}>Register</PrimaryButton>
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
export default connect(mapStateToProps)(Register);