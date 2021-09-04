import React from "react";
import "../../../App.css"
import {Col, Row} from "react-bootstrap";
import GameCard from "./GameCard";

class GameList extends React.Component{

    render() {
        return <Row xs={1} md={2} lg={5}>
            {Array.from({ length: 15}).map((_, idx) => (
                <Col>
                    <GameCard/>
                </Col>
            ))}
        </Row>
    }
}

export default GameList;