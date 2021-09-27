import React from "react";
import AccountPivot from "./AccountPivot";
import {Col, Row} from "react-grid-system";

function Settings(props){
    return <div>
        <Row>
            <Col/>
            <Col sm={12} md={8} lg={8}>
                <div style={{fontSize:"40px", marginLeft:"15px", marginBottom:"10px"}}>Account</div>
                <AccountPivot></AccountPivot>
            </Col>
            <Col/>
        </Row>
    </div>
}

export default Settings;