import React from "react";
import {Card} from "react-bootstrap";
import {getTheme} from "../../../Core/Global/global.selectors";
import {connect} from "react-redux";

class GameCard extends React.Component{

    constructor(props) {
        super(props);
        this.state = {};
    }
    redirectToGame(){
    }

    render() {
        let cardBodyColor = "#1e1f21";
        if(!this.props.theme){
            cardBodyColor = "#ffffff"
        }

        return <Card tag="a" onClick={this.redirectToGame} style={{ cursor: "pointer", marginBottom:"12px" }}>
            <Card.Img variant="top" src="fortnite.webp" />
            <Card.Body style={{backgroundColor: cardBodyColor}}>
                <Card.Title>Fortnite</Card.Title>
                <Card.Text>2548 Gamers</Card.Text>
            </Card.Body>
        </Card>
    }
}
const mapStateToProps = (state) => {
    return {
        theme : getTheme(state)
    };
};
export default connect(mapStateToProps)(GameCard);