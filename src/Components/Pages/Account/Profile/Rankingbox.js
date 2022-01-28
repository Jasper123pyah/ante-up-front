import React, {useEffect, useState} from "react";
import {Col, Row} from "react-grid-system";

function Rankingbox(props) {

    const [recentWagers, setRecentWagers] = useState([])
    const [record, setRecord] = useState({})

    useEffect(() => {
        if(props.info !== undefined){
            setRecentWagers(props.info.recentWagers)
            let winRate = getWinrate(props.info.wins, props.info.losses);
            setRecord({wins: props.info.wins, losses: props.info.losses, winRate: winRate})
        }

    },[props]);

    function getWinrate(wins,losses) {
        if(wins+losses === 0){
            return <div style={{fontSize: 'x-large', marginTop: '3vh'}}>
                N/A
            </div>
        }else{
            let winrate = Math.round((wins+losses)/wins);
            return <div style={{fontSize: 'large', marginTop: '3vh'}}>
                Win rate: {winrate}%
            </div>
        }
    }

    function showRecentWagers() {
        if(recentWagers !== undefined){
            return recentWagers.length > 0 ? recentWagers.map(wager => <div className={'recentWager'}>
                    <div style={{fontSize: 'x-large'}}>
                        {wager.won ? "W" : "L"}
                    </div>
                    <div style={{
                        borderRadius: '50%',
                        width: '25px',
                        height: '25px',
                        backgroundColor: wager.won ? 'green' : 'red'
                    }}/>
                    <div style={{fontSize: 'medium'}}>{wager.won ? "+$" + wager.earning : "-$" + wager.earning}</div>
                </div>
            ) : <div style={{fontSize: "x-large", marginTop: "3vh"}}>No recent wagers</div>
        }
    }

    return <div className={'rankingBox'}>
        <Row>
            <Col lg={4} md={6} sm={12}>
                <div className={'ranking'}>
                    <div style={{marginBottom: '1vw'}} className={'rankingTitle'}>
                        EARNINGS
                    </div>
                    <div className={'rankingText'}>
                        ${props.info.earnings}
                    </div>
                </div>
            </Col>
            <Col lg={4} md={6} sm={12}>
                <div className={'ranking'}>
                    <div className={'rankingTitle'}>
                        RECORD
                    </div>
                    <div className={'rankingText'}>
                        {record.winRate}
                    </div>
                </div>
            </Col>
            <Col lg={4} md={6} sm={12}>
                <div className={'ranking'}>
                    <div className={'rankingTitle'}>
                        RECENT WAGERS
                    </div>
                    <div className={'rankingText'}>
                        <div style={{display: 'flex'}}>
                            {showRecentWagers()}
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    </div>
}

export default Rankingbox;