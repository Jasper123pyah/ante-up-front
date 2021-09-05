import React from "react";
import "../../../App.css"
import {Col, Row} from "react-bootstrap";
import GameCard from "./GameCard";

class GameList extends React.Component{

    list=[
        {
            img: "apex.jpg",
            name: "Apex Legends",
            playercount: 2314
        },
        {
            img:"fortnite.webp",
            name:"Fortnite",
            playercount:2342
        },
        {
            img:"minecraft.png",
            name:"Minecraft",
            playercount:5412
        }
    ]
    render() {
        return <Row xs={1} md={2} lg={5}>
            {this.list.map((Game) => (
                <Col>
                    <GameCard img={Game.img} name={Game.name} playercount={Game.playercount}/>
                </Col>
            ))}
            {this.list.map((Game) => (
                <Col>
                    <GameCard img={Game.img} name={Game.name} playercount={Game.playercount}/>
                </Col>
            ))}
        </Row>
    }
}

export default GameList;