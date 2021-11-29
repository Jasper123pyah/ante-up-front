import React from "react";
import {Col, Row} from "react-grid-system";

function Reviews(){
    return <div style={{backgroundColor:'black',  width:'100%'}}>
        <div className={"title"}>Reviews</div>
        <Row>
            <Col sm={12} md={1} lg={1.5}/>
            <Col sm={12} md={10} lg={9}>
                <Row>
                    <Col sm={12} md={6} lg={4}>
                        <div className={'centered'}>
                            <div className={'reviewBox'}>
                                <div className={'reviewContent'}>
                                    <div>
                                        It's me Sonic the hedgehog!
                                    </div>
                                    <br/>
                                    <div className={'reviewName'}>
                                        - Sonic
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col sm={12} md={6} lg={4}>
                        <div className={'centered'}>
                            <div className={'reviewBox'}>
                                <div className={'reviewContent'}>
                                    <div>
                                        It's me Sonic the hedgehog!
                                    </div>
                                    <br/>
                                    <div className={'reviewName'}>
                                        - Sonic
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col sm={12} md={6} lg={4}>
                        <div className={'centered'}>
                            <div className={'reviewBox'}>
                                <div className={'reviewContent'}>
                                    <div>
                                        It's me Sonic the hedgehog!
                                    </div>
                                    <br/>
                                    <div className={'reviewName'}>
                                        - Sonic
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    </div>
}

export default Reviews;