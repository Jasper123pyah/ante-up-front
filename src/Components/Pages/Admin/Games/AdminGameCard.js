import React, {useEffect, useState} from "react";
import {getAPI} from "../../../../Core/Global/global.selectors";
import {connect} from "react-redux";
import {Card} from "react-bootstrap";
import {PrimaryButton} from "@fluentui/react";

function AdminGameCard(props) {

    useEffect(() => {

    }, []);


    return <Card style={{marginBottom: "15px", width: "100%"}}>
        <Card.Img width={285} variant="top" src={"./Images/" + props.img}/>
        <Card.Body style={{backgroundColor: "#1e1f21"}}>
            <Card.Title style={{fontSize: "2.5vh"}}>{props.name}</Card.Title>
            <PrimaryButton style={{
                margin: "0 auto",
                display: "block",
                backgroundColor: "#a4262c",
                borderColor: "#a4262c",
                color:"#ffffff"
            }} text={"Delete"}/>
        </Card.Body>
    </Card>
}

const mapStateToProps = (state) => {
    return {
        api: getAPI(state)
    };
};

export default connect(mapStateToProps)(AdminGameCard);