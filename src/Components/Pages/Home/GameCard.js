import React from "react";
import {Card} from "react-bootstrap";
import {useHistory} from "react-router-dom";

function GameCard (props){
    let history = useHistory();

    function redirectToGame(){
        history.push("/game/"+props.name)
    }

    let cardBodyColor = "#1e1f21";
    if(localStorage.getItem('darkMode') === 'false'){
        cardBodyColor = "#ffffff"
    }

    return <Card tag="a" onClick={redirectToGame} style={{ cursor: "pointer", marginBottom:"15px", width:"100%"}}>
        <Card.Img  height={300} variant="top" src={"./Images/"+props.img} />
        <Card.Body style={{backgroundColor: cardBodyColor}}>
            <Card.Title>{props.name}</Card.Title>
            <Card.Text>{props.playercount} Players</Card.Text>
        </Card.Body>
    </Card>

}
export default GameCard;