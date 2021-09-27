import React, {useEffect, useState} from "react";
import "../../../App.css"
import {Col, Row} from "react-bootstrap";
import GameCard from "./GameCard";
import {getAPI} from "../../../Core/Global/global.selectors";
import {connect} from "react-redux";

function GameList(props){

    const [gameList,setGameList] = useState([]);

    useEffect(() => {
        getGames();
    });

    useEffect( () =>
        () => setGameList([]), [] );

    function getGames(){
        if(props.api !== undefined)
        {
            props.api.get('game').then(res => {
                setGameList(res.data);
            })
        }
    }

    return <Row sm={1} md={2} lg={5} >
        {gameList.map((Game) => (
            <Col sm={12}>
                <GameCard key={Game.id} img={Game.image} name={Game.name} playercount={5615}/>
            </Col>
        ))}
        {gameList.map((Game) => (
            <Col sm={12}>
                <GameCard key={Game.id} img={"test.png"} name={"Testgame"} playercount={1234}/>
            </Col>
        ))}
        {gameList.map((Game) => (
        <Col sm={12}>
            <GameCard key={Game.id} img={"test.png"} name={"Testgame"} playercount={1234}/>
        </Col>
         ))}
        {gameList.map((Game) => (
        <Col sm={12}>
            <GameCard key={Game.id} img={"test.png"} name={"Testgame"} playercount={1234}/>
        </Col>
        ))}
    </Row>
}
const mapStateToProps = (state) => {
    return {
        api : getAPI(state)
    };
};


export default connect(mapStateToProps)(GameList);