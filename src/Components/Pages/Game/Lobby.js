import React, {useEffect, useState} from "react";
import {DefaultButton,   Separator} from "@fluentui/react";
import {Col, Row} from "react-grid-system";
import "../../../App.css";
import {getAPI} from "../../../Core/Global/global.selectors";
import {connect} from "react-redux";
import {useCookies} from "react-cookie";

function Lobby(props){
    let id = props.id;
    const [boxItemClass, setBoxItemClass] = useState("lobbyBoxItemDark");
    const [wager, setWager] = useState({});
    const [team1, setTeam1] = useState([]);
    const [team2, setTeam2] = useState([]);
    const [cookies] = useCookies("ANTE_UP_SESSION_TOKEN");

    useEffect(() => {
        if(props.api !== undefined) {
            props.api.get('/wager/getbyid', {
                params: { id: id }
            }).then(res => {
                setWager({
                    ante: res.data.ante,
                    description: res.data.description,
                    hostId: res.data.hostId,
                    playercap: res.data.playerCap,
                    title: res.data.title,
                    game: res.data.game
                });
                setTeam1(res.data.team1.players);
                setTeam2(res.data.team2.players);
            })
        }
    },[]);

    const switchTeam = (teamNumber) =>{
        if(props.api !== undefined) {
            props.api.post("/wager/jointeam", {
                    wagerId: id,
                    playerId: cookies.ANTE_UP_SESSION_TOKEN,
                    teamNumber: teamNumber
            })
        }
    }
    function joinButton(team, number){
        if(team.length < (wager.playercap/2) && !team.some(player => player.id == cookies.ANTE_UP_SESSION_TOKEN)){
            return <div style={{display:"flex", alignItems:"center"}} className={boxItemClass}>
                <DefaultButton onClick={() => switchTeam(number)} style={{marginRight:"10px", position: "absolute", right: "10px"}} text={"Join"}/>
            </div>
        }
    }
    return<div>
        <div style={{fontSize:"40px", marginBottom:"10px"}}>Lobby for {wager.game}</div>
        <div style={{fontSize:"30px", marginBottom:"10px"}}>{wager.title}</div>
        <div style={{fontSize:"20px", marginBottom:"10px"}}>{wager.description}</div>
        <Separator/>
        <Row>
            <Col>
                <div style={{fontSize:"20px"}}>Team 1</div>
                <div className={"lobbyBox"}>
                    {team1.map(player =>
                        <div style={{display:"flex", alignItems:"center"}} className={boxItemClass}>
                            <div style={{marginLeft:"10px", fontSize:"16px"}}>{player.username}</div>
                            {wager.hostId !== cookies.ANTE_UP_SESSION_TOKEN ? <DefaultButton style={{marginRight:"10px", position: "absolute",
                                right: "10px"}} text={"Kick"}/> : null}
                        </div>
                    )}
                    {joinButton(team1, 1)}
                </div>
            </Col>
            <Col>
                <div style={{fontSize:"20px"}}>Team 2</div>
                <div className={"lobbyBox"}>
                    {team2.map(player =>
                        <div style={{display:"flex", alignItems:"center"}} className={boxItemClass}>
                            <div style={{marginLeft:"10px", fontSize:"16px"}}>{player.username}</div>
                            {wager.hostId !== cookies.ANTE_UP_SESSION_TOKEN ? <DefaultButton style={{marginRight:"10px", position: "absolute",
                                right: "10px"}} text={"Kick"}/> : null}
                        </div>
                    )}
                    {joinButton(team2, 2)}
                </div>
            </Col>
        </Row>
    </div>
}
const mapStateToProps = (state) => {
    return {
        api : getAPI(state)
    };
};
export default connect(mapStateToProps)(Lobby);