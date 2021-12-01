import React from "react";
import MainScreen from "./MainScreen";
import Reviews from "./Reviews";
import {Col, Row} from "react-grid-system";
import HowItWorks from "./HowItWorks";

function PreLoginHome(){

    return <div>
        <Row>
            <Col sm={12} md={1} lg={1.5}/>
            <Col sm={12} md={10} lg={9}>
                <MainScreen/>
            </Col>
        </Row>
        <Reviews/>
        <Row>
            <Col sm={12} md={1} lg={1.5}/>
            <Col sm={12} md={10} lg={9}>
                <HowItWorks />
            </Col>
        </Row>
    </div>
}
export default PreLoginHome;
