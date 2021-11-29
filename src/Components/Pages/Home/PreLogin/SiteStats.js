import {Col, Row} from "react-grid-system";
import {GiCrossedSwords, GiPayMoney, GiPokerHand} from "react-icons/all";
import React from "react";

function SiteStats(){

    return<div>
        <Row>
            <Col sm={12} md={6} lg={4}>
                <div className={'centered'}>
                    <div className={'mainBox'}>
                        <div className={'centered'} style={{marginTop:'3vh'}}>
                            <div className={'iconCircle centered'}>
                                <GiCrossedSwords className={'statsIcon'}/>
                            </div>
                            <div className={'statsText'}>
                                444 Matches Played
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
            <Col sm={12} md={6} lg={4}>
                <div className={'centered'}>
                    <div className={'mainBox'}>
                        <div className={'centered'} style={{marginTop:'3vh'}}>
                            <div className={'iconCircle centered'}>
                                <GiPayMoney className={'statsIcon'}/>
                            </div>
                            <div className={'statsText'}>
                                $1111 Earnings paid
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
            <Col sm={12} md={6} lg={4}>
                <div className={'centered'}>
                    <div className={'mainBox'}>
                        <div className={'centered'} style={{marginTop:'3vh'}}>
                            <div className={'iconCircle centered'}>
                                <GiPokerHand className={'statsIcon'}/>
                            </div>
                            <div className={'statsText'}>
                                111 Current Wagers
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    </div>
}

export default SiteStats;