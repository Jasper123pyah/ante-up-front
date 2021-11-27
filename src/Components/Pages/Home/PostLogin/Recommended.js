import React from "react";
import {Col, Row} from "react-grid-system";

function Recommended(){
    return <div style={{marginTop: "2vh", marginBottom:"2vh"}}>
        <Row>
            <Col>
                <div style={{height:"50vh", border:"1px solid white"}}>

                </div>
            </Col>
            <Col>
                <Row>
                    <div style={{height:"25vh", width:"100%", border:"1px solid white", marginBottom:"1vh"}}>

                    </div>
                </Row>
                <Row>
                    <div style={{height:"24vh", width:"49%", border:"1px solid white"}}>

                    </div>
                    <div style={{width:'2%'}}/>
                    <div style={{height:"24vh", width:"49%", border:"1px solid white"}}>

                    </div>
                </Row>
            </Col>
        </Row>
    </div>
}

export default Recommended;