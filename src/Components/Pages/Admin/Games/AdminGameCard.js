import React, {useEffect, useState} from "react";
import {getAPI} from "../../../../Core/Global/global.selectors";
import {connect} from "react-redux";
import {Card} from "react-bootstrap";
import {DefaultButton} from "@fluentui/react";
import {GetCardImage} from "../../../../Core/FirebaseImages/FirebaseImage";
function AdminGameCard(props) {

    return <Card style={{marginBottom: "15px", width: "100%"}}>
        <Card.Img height={380} src={GetCardImage(props.img)}/>
        <Card.Body style={{backgroundColor: "#1e1f21"}}>
            <Card.Title style={{fontSize: "medium"}}>{props.name}</Card.Title>
            <DefaultButton  style={{
                margin: "0 auto",
                display: "block",
                color: "#ffffff"
            }} text={"Edit"}/>
        </Card.Body>
    </Card>
}
//  <Card.Img width={285} variant="top" src={GetImage(props.img)} />
const mapStateToProps = (state) => {
    return {
        api: getAPI(state)
    };
};

export default connect(mapStateToProps)(AdminGameCard);