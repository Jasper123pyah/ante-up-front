import React from "react";
import {Col, Row} from "react-grid-system";
import RecommendedBig from "./RecommendedBig";
import RecommendedSmall from "./RecommendedSmall";
import RecommendedMed from "./RecommendedMed";
import RecommendedSlider from "./RecommendedSlider";
function Recommended(){

    function showVersion(){
        if(window.innerWidth < 1000){
            return <div style={{padding:'3vw', height:'auto'}}>
                <RecommendedSlider/>
            </div>
        }else{
            return <div style={{padding:'3vw', height:'auto'}}>
                <Row>
                    <Col>
                        <RecommendedBig/>
                    </Col>
                    <Col>
                        <Row>
                            <RecommendedMed/>
                        </Row>
                        <Row>
                            <RecommendedSmall/>
                            <div style={{width:'2%'}}/>
                            <RecommendedSmall/>
                        </Row>
                    </Col>
                </Row>
            </div>
        }
    }

    return showVersion();
}

export default Recommended;