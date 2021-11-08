import React, {useEffect, useState} from "react";
import {getAPI} from "../../../../Core/Global/global.selectors";
import {connect} from "react-redux";
import {Card} from "react-bootstrap";
import {PrimaryButton} from "@fluentui/react";

function AdminGameCard(props){

    useEffect(() => {

    },[]);

    let cardBodyColor = "#1e1f21";
    if(localStorage.getItem('darkMode') === 'false'){
        cardBodyColor = "#ffffff"
    }

    return<Card style={{ marginBottom:"15px", width:"100%"}}>
        <Card.Img  width={285}  variant="top" src={"./Images/"+props.img} />
        <Card.Body style={{backgroundColor: cardBodyColor}}>
            <Card.Title style={{fontSize:"2.5vh"}} >{props.name}</Card.Title>
            <PrimaryButton style={{backgroundColor:"#a4262c", borderColor:"#a4262c"}} text={"Delete"}/>
        </Card.Body>
    </Card>
}
const mapStateToProps = (state) => {
    return {
        api : getAPI(state)
    };
};

export default connect(mapStateToProps)(AdminGameCard);