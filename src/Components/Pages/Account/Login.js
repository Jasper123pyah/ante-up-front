import React from "react";
import {Col, Row} from "react-grid-system";
import {PrimaryButton, Checkbox, TextField} from "@fluentui/react";
import {Link} from "react-router-dom";

class Login extends React.Component{
    render() {
        let EmailError = "";
        let PasswordError = "";

        return <div>
            <Row>
                <Col/>
                <Col sm={12} md={6} lg={4}>
                    <div style={{alignContent:"center"}}>
                        <div style={{fontSize:"40px"}}>Login</div>
                        <TextField label="Email " required errorMessage={EmailError}  />
                        <TextField
                            label="Password"
                            type="password"
                            canRevealPassword
                            revealPasswordAriaLabel="Show password"
                            required
                            errorMessage={PasswordError}
                        />
                        <Link to={"/passwordforgotten"}>Forgotten Password?</Link>
                        <br/>
                        <Link to={"/register"}>Don't have an account yet?</Link>
                        <Checkbox  label={"Remember me"}  />
                        <PrimaryButton style={{float:"right"}}>Login</PrimaryButton>
                    </div>
                </Col>
                <Col/>
            </Row>
        </div>
    }
}

export default Login;