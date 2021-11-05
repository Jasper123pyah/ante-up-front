import React from "react";
import AccountPivot from "./AccountPivot";
import {Col, Row} from "react-grid-system";

function Account(props){
    return <div>
        <Row>
            <Col/>
            <Col sm={12} md={10} lg={10}>
                <div style={{fontSize:"40px", marginLeft:"15px", marginBottom:"10px"}}>Account</div>
                <AccountPivot></AccountPivot>
            </Col>
            <Col/>
        </Row>
    </div>
}

export default Account;