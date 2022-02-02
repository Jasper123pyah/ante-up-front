import React, {useEffect, useState} from "react";
import {getAPI} from "../../../../Core/Global/global.selectors";
import {connect} from "react-redux";
import {Card} from "react-bootstrap";
import {DefaultButton} from "@fluentui/react";
import {GetImage} from "../../../../Core/FirebaseImages/FirebaseImage";
function AdminGameCard(props) {

    function OpenEdit(){
        props.setEdit(props.game);
    }
    return <Card bg={"secondary"} style={{marginBottom: "15px", width: "100%"}}>
        <Card.Img width={285} variant="top" src={GetImage("CardImages", props.game.image)}/>
        <Card.Body style={{backgroundColor: "#1e1f21"}}>
            <Card.Title style={{fontSize: "medium"}}>{props.game.name}</Card.Title>
            <DefaultButton  style={{
                margin: "0 auto",
                display: "block",
                color: "#ffffff"
            }} onClick={OpenEdit} text={"Edit"}/>
        </Card.Body>
    </Card>
}
const mapStateToProps = (state) => {
    return {
        api: getAPI(state)
    };
};

export default connect(mapStateToProps)(AdminGameCard);