import React, {useEffect, useState} from "react";
import {getAPI} from "../../../../Core/Global/global.selectors";
import {connect} from "react-redux";
import {Card} from "react-bootstrap";
import {DefaultButton} from "@fluentui/react";

function AdminGameCard(props) {

    useEffect(() => {

    }, []);

    return <Card style={{marginBottom: "15px", width: "100%"}}>
        <Card.Img width={285} variant="top" src={"./Images/" + props.img}/>
        <Card.Body style={{backgroundColor: "#1e1f21"}}>
            <Card.Title style={{fontSize: "x-large"}}>{props.name}</Card.Title>
            <DefaultButton style={{
                margin: "0 auto",
                display: "block",
                color:"#ffffff"
            }} text={"Edit"}/>
        </Card.Body>
    </Card>
}

const mapStateToProps = (state) => {
    return {
        api: getAPI(state)
    };
};

export default connect(mapStateToProps)(AdminGameCard);