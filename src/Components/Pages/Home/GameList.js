import React, {useEffect, useState} from "react";
import "../../../App.css"
import {Col, Row} from "react-bootstrap";
import GameCard from "./GameCard";
import {getAPI, getGames} from "../../../Core/Global/global.selectors";
import {connect} from "react-redux";

function GameList(props){


    return <Row sm={1} md={2} lg={5} >
        {props.games.map((Game) => (
            <Col sm={12}>
                <GameCard key={Game.id} img={Game.image} name={Game.name} playercount={5615}/>
            </Col>
        ))}
    </Row>
}
const mapStateToProps = (state) => {
    return {
        games : getGames(state),
        api : getAPI(state)
    };
};


export default connect(mapStateToProps)(GameList);