import React from "react";
import {Col, Row} from "react-grid-system";
import {PrimaryButton, TextField} from "@fluentui/react";

class Login extends React.Component{
    render() {
        let EmailError = "";
        let PasswordError = "";
        let UsernameError = "";
        return <div>
            <Row>
                <Col/>
                <Col sm={12} md={6} lg={4}>
                    <div style={{alignContent:"center"}}>
                        <div style={{fontSize:"40px"}}>Register</div>
                        <TextField label="Username" required errorMessage={UsernameError}/>
                        <TextField label="Email" required errorMessage={EmailError}  />
                        <TextField
                            label="Password"
                            type="password"
                            canRevealPassword
                            revealPasswordAriaLabel="Show password"
                            required
                            errorMessage={PasswordError}
                        />
                        <TextField
                        label="Confirm Password"
                        type="password"
                        canRevealPassword
                        revealPasswordAriaLabel="Show password"
                        required
                        errorMessage={PasswordError}
                        />
                        <PrimaryButton style={{float:"right"}}>Register</PrimaryButton>
                    </div>
                </Col>
                <Col/>
            </Row>
        </div>
    }
}

export default Login;