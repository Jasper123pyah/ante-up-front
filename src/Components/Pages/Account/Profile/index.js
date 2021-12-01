import React, {useEffect, useState} from "react";
import {getAPI} from "../../../../Core/Global/global.selectors";
import {connect} from "react-redux";
import './Profile.css';
import Rankingbox from "./Rankingbox";
import BasicInfo from "./BasicInfo";
import {Col, Row} from "react-grid-system";
import GameStatsCard from "./GameStatsCard";

function Profile() {
    const [accountInfo, setAccountInfo] = useState({});
    const [gameStats, setGameStats] = useState([
        {
            gameName: 'Fortnite'
        },
        {
            gameName: 'Fortnite'
        },
        {
            gameName: 'Fortnite'
        },
        {
            gameName: 'Fortnite'
        },
        {
            gameName: 'Fortnite'
        },
        {
            gameName: 'Fortnite'
        },

    ]);

    useEffect(() => {
    }, []);

    return <div>
        <div className={'profileBanner'}>
            <div style={{height: '10vh'}}/>
            <div className={'accountInfo'}>
                <BasicInfo/>
                <Rankingbox/>
            </div>
        </div>
        <div className={'gameContainer'}>
            <Row>
                {gameStats.map(stat => <Col sm={12} md={6} lg={3}>
                   <GameStatsCard stat={stat}/>
                </Col>)}
            </Row>

        </div>
    </div>
}

const mapStateToProps = (state) => {
    return {
        api: getAPI(state)
    };
};

export default connect(mapStateToProps)(Profile);
