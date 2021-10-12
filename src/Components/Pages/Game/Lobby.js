import React, {useEffect, useState} from "react";
import {DefaultButton, Separator, TextField} from "@fluentui/react";
import {Col, Row} from "react-grid-system";
import "../../../App.css";
import {getAPI, getGlobalConnection} from "../../../Core/Global/global.selectors";
import {connect} from "react-redux";

function Lobby(props){
    let id = props.id;
    const [wager, setWager] = useState({});
    const [team1, setTeam1] = useState([]);
    const [team2, setTeam2] = useState([]);

    useEffect(() => {
        getWager()
    },[id, props.api]);

    function getWager(){
        if(props.api !== undefined) {
            props.api.get('/wager/getbyid', {
                params: { id: id }
            }).then(res => {
                setWager({
                    ante: res.data.ante,
                    description: res.data.description,
                    hostId: res.data.hostId,
                    hostName: res.data.hostName,
                    playercap: res.data.playerCap,
                    title: res.data.title,
                    game: res.data.game
                });
                setTeam1(res.data.team1.players);
                setTeam2(res.data.team2.players);
            })
        }
    }
    async function joinTeam(team) {
        let user = localStorage.getItem("ANTE_UP_SESSION_TOKEN");
        let lobby = id;

        props.connection.on("LobbyJoined", (lobbyJoin) => {
            console.log(lobbyJoin.player + " joined team " + lobbyJoin.team)
            getWager();
        });

        await props.connection.invoke("JoinLobby", {user,lobby, team});
    }

    function playerCapToString(){
        let teamCap = wager.playercap/2;
        return teamCap.toString() + "v" + teamCap.toString()
    }

    function fillSlots(team, number){
        let teamCap = wager.playercap/2;
        let emptySlots = teamCap - team.length;
        let items = [];
        for(let i = 0; i < emptySlots; i++){
            if(i === 0 && !team.some(player => player.id === localStorage.getItem("ANTE_UP_SESSION_TOKEN")))
                items.push(<div style={{display:"flex", alignItems:"center"}} className={boxItemClass}>
                    <DefaultButton onClick={() => joinTeam(number)} style={{marginRight:"10px", position: "absolute", right: "10px"}} text={"Join"}/>
                    <div style={{marginLeft:"10px", fontSize:"16px"}}>Empty</div>
                </div>);
            else{
                items.push(<div style={{display:"flex", alignItems:"center"}} className={boxItemClass}>
                    <div style={{marginLeft:"10px", fontSize:"16px"}}>Empty</div>
                </div>);
            }
        }
        return items;
    }
    function kickButton(player, number){
        if(wager.hostId === localStorage.getItem("ANTE_UP_SESSION_TOKEN") &&
            player.id !== localStorage.getItem("ANTE_UP_SESSION_TOKEN")){
            return <DefaultButton style={{marginRight:"10px", position: "absolute",
                right: "10px"}} text={"Kick"} onClick={() => leavePlayer(player, number)}/>
        }
    };
    function leaveButton(player, number){
        if(player.id === localStorage.getItem("ANTE_UP_SESSION_TOKEN")) {
            return <DefaultButton style={{
                marginRight: "10px", position: "absolute",
                right: "10px"
            }} text={"Leave"} onClick={() => leavePlayer(player, number)}/>
        }
    }
    async function leavePlayer(player){
        let user = player.id;
        let lobby = id;

        props.connection.on("LobbyLeft", (lobbyJoin) => {
            console.log(lobbyJoin.player + " left the game. ")
            getWager();
        });
        props.connection.on("YouLeft", ()=>{
            console.log("You left");
            getWager();
        })
        await props.connection.invoke("LeaveLobby", {user,lobby});

    }

    let boxItemClass = "lobbyBoxItemDark";
    if(localStorage.getItem('darkMode') === 'false'){
        boxItemClass = "lobbyBoxItemLight"
    }
    let boxHeight = (((wager.playercap/2) * 50) + "px").toString();

    return<div>
        <div style={{fontSize:"40px"}}>{wager.hostName}'s game</div>
        <div style={{fontSize:"20px", marginBottom:"10px"}}>{wager.game} ● {playerCapToString()} ● ${wager.ante}</div>
        <div style={{fontSize:"20px", marginBottom:"10px"}}>{wager.description}</div>
        <Separator/>
        <Row>
            <Col>
                <div style={{fontSize:"20px"}}>Team 1</div>
                <div style={{height:boxHeight}} className={"lobbyBox"}>
                    {team1.map(player =>
                        <div style={{display:"flex", alignItems:"center"}} className={boxItemClass}>
                            <div style={{marginLeft:"10px", fontSize:"16px"}}><b>{player.username}</b></div>
                            {kickButton(player, 1)}
                            {leaveButton(player, 1)}
                        </div>
                    )}
                    {fillSlots(team1, 1).map(object => object)}
                </div>
            </Col>
            <Col>
                <div style={{fontSize:"20px"}}>Team 2</div>
                <div style={{height:boxHeight}}  className={"lobbyBox"}>
                    {team2.map(player =>
                        <div style={{display:"flex", alignItems:"center"}} className={boxItemClass}>
                            <div style={{marginLeft:"10px", fontSize:"16px"}}><b>{player.username}</b></div>
                            {kickButton(player, 2)}
                            {leaveButton(player, 2)}
                        </div>
                    )}
                    {fillSlots(team2, 2)}
                </div>
            </Col>
        </Row>
    </div>
}
const mapStateToProps = (state) => {
    return {
        connection : getGlobalConnection(state),
        api : getAPI(state)
    };
};
export default connect(mapStateToProps)(Lobby);