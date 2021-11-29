import React from "react";
import Recommended from "./Recommended/Recommended";
import WagerList from "./WagerList";
import TournamentList from "./TournamentList";
import {Col, Row} from "react-grid-system";
import './PostLogin.css'

function PostLoginHome(){
    return <div>
        <Recommended/>
        <Row>
            <Col sm={12} md={1} lg={1.5}/>
            <Col sm={12} md={10} lg={9}>
                <WagerList/>
                <TournamentList/>
            </Col>
        </Row>
    </div>
}
export default PostLoginHome;