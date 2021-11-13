import React, {useEffect, useState} from "react";
import "../../../App.css"
import {Col, Row} from "react-bootstrap";
import GameCard from "./GameCard";
import {getAPI, getGames} from "../../../Core/Global/global.selectors";
import {connect} from "react-redux";
import {setGames} from "../../../Core/Global/global.actions";
import {PulseLoader} from "react-spinners";
import CenteredLoader from "../../Shared/CenteredLoader";

function GameList(props){

    const [gameList, setGameList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(props.games.length !== 0){
            setGameList(props.games)
        }else{
            getGames();
        }
    },[props.api]);

    function getGames(){
        setLoading(true);
        if(props.api !== undefined){
            props.api.get('game').then(res => {
                props.dispatch(setGames(res.data))
                setGameList(res.data);
                setLoading(false);
            })
        }
    }

    return <div>
        {loading ? <CenteredLoader/>:
            <Row sm={1} md={2} lg={5} >
                {gameList.map((Game) => (
                    <Col sm={12}>
                        <GameCard key={Game.id} img={Game.image} name={Game.name} playercount={5615}/>
                    </Col>
                ))}
            </Row>}
    </div>
}
const mapStateToProps = (state) => {
    return {
        api: getAPI(state),
        games : getGames(state),
    };
};


export default connect(mapStateToProps)(GameList);