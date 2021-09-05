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

        return <Card tag="a" onClick={this.redirectToGame} style={{ cursor: "pointer", marginBottom:"15px" }}>
            <Card.Img  height={300} variant="top" src={"./Images/"+this.props.img} />
            <Card.Body style={{backgroundColor: cardBodyColor}}>
                <Card.Title>{this.props.name}</Card.Title>
                <Card.Text>{this.props.playercount} Players</Card.Text>
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