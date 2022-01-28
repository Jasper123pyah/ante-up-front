import React, {useEffect, useState} from "react";
import {getAPI} from "../../../../Core/Global/global.selectors";
import {connect} from "react-redux";
import './Profile.css';
import Rankingbox from "./Rankingbox";
import BasicInfo from "./BasicInfo";
import {Col, Row} from "react-grid-system";
import GameStatsCard from "./GameStatsCard";
import CenteredLoaderFS from "../../../Shared/CenteredLoaderFS";

function Profile(props) {
    const [gameStats, setGameStats] = useState([]);
    const [basicInfo, setBasicInfo] = useState({});
    const [rankings, setRankings] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(0);

    useEffect(() => {
        if (props.api !== undefined && props.name !== undefined) {
            let name = props.name;
            setLoading(true);
            props.api.get("profile/" + name).then(res => {
                setLoading(false);
                setGameStats(res.data.gameStats);
                setBasicInfo({accountName: res.data.accountName, joined: res.data.joined});
                setRankings({
                    earnings: res.data.earnings,
                    wins: res.data.wins,
                    losses: res.data.losses,
                    recentWagers: res.data.recentWagers
                });
            }).catch(err => {
                if (err.response.status === 404) {
                    setLoading(false);
                    setError(404);
                }
            });
        }
    }, [props.name, props.api]);

    function showGameStats() {
        if (gameStats.length === 0) {
            return <div className={"centered"} style={{height: '10vw', fontSize: 'xx-large', marginBottom: '2vw'}}>
                No game stats found
            </div>
        } else {
            return <Row>
                {gameStats.map(stat => <Col sm={12} md={6} lg={3}>
                    <GameStatsCard stat={stat}/>
                </Col>)}
            </Row>
        }
    }

    return <div>
        {loading ? <CenteredLoaderFS/> :
            error === 404 ? <div>Account not found.</div> :
                <div>
                    <div className={'profileBanner'}>
                        <div className={'accountInfo'}>
                            <BasicInfo info={basicInfo}/>
                        </div>
                    </div>
                    <Rankingbox info={rankings}/>
                    <div className={'gameContainer'}>
                        {showGameStats()}
                    </div>
                </div>
        }

    </div>
}

const mapStateToProps = (state) => {
    return {
        api: getAPI(state)
    };
};

export default connect(mapStateToProps)(Profile);
