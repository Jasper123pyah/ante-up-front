import React, {useEffect, useState} from "react";
import {getAPI} from "../../../../Core/Global/global.selectors";
import {connect} from "react-redux";
import {PrimaryButton, TextField} from "@fluentui/react";
import {Col, Row} from "react-bootstrap";
import GameCard from "../../Home/PostLogin/GameCard";
import AdminGameCard from "./AdminGameCard";
import CenteredLoader from "../../../Shared/CenteredLoader";

function AdminGames(props){
    const[games, setGames] = useState([]);
    const[loading, setLoading] = useState(true);
    useEffect(() => {
        getAllGames();
    },[props.api]);

    function getAllGames(){
        if(props.api !== undefined){
            setLoading(true)
            props.api.get('/Game').then(res => {
                console.log(res.data)
                setGames(res.data);
                setLoading(false)
            })
        }
    }

    return<div>
        {loading ? <CenteredLoader/> : <div>
            <div className={"adminCreatePanel"}>
                <div style={{margin:"10px", marginLeft:"25px", fontSize:"20px"}}>Add a new game</div>
                <div style={{display:"flex", justifyContent:"space-evenly"}}>
                    <div style={{width:"40%"}}>
                        <TextField />
                    </div>
                    <div style={{width:"40%"}}>
                        <input type="file" name="file"/>
                    </div>
                    <div style={{}}>
                        <PrimaryButton text={"Create"} iconProps={{iconName: 'Add'}}/>
                    </div>
                </div>
            </div>
            <Row sm={1} md={2} lg={5} >
                {games.map((Game) => (
                    <Col sm={12}>
                        <AdminGameCard key={Game.id} img={Game.image} name={Game.name} playercount={5615}/>
                    </Col>
                ))}
            </Row>
        </div>}
    </div>
}
const mapStateToProps = (state) => {
    return {
        api : getAPI(state)
    };
};

export default connect(mapStateToProps)(AdminGames);