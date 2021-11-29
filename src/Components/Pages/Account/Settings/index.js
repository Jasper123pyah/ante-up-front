import React, {useEffect} from "react";
import AccountPivot from "./AccountPivot";
import {useCookies} from "react-cookie";
import {useHistory} from "react-router-dom";
import {Col, Row} from "react-grid-system";

function Account(props) {
    const [cookies] = useCookies(['ANTE_UP_SESSION_TOKEN']);
    let history = useHistory();

    useEffect(() => {
        if (cookies.ANTE_UP_SESSION_TOKEN === undefined) {
            history.push("/login");
        }
    });
    return <div>
        <Row>
            <Col sm={12} md={1} lg={1.5}/>
            <Col sm={12} md={10} lg={9}>
                <div style={{fontSize: "40px", marginLeft: "15px", marginBottom: "10px"}}>Account</div>
                <AccountPivot/>
            </Col>
        </Row>
    </div>
}

export default Account;