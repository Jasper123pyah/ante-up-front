import React, {useEffect, useState} from "react";
import {DefaultButton, PrimaryButton, Separator} from "@fluentui/react";
import {Col, Row} from "react-grid-system";
import "../../../App.css";
import {getAccountInfo, getAPI, getGlobalConnection, getWagerAPI} from "../../../Core/Global/global.selectors";
import {connect} from "react-redux";
import LobbyChatbox from "../../Chat/LobbyChatbox";
import {useHistory} from "react-router-dom";
import {setAccountInfo} from "../../../Core/Global/global.actions";
import CenteredLoader from "../../Shared/CenteredLoader";
import {useCookies} from "react-cookie";

function Lobby(props) {
    const [wager, setWager] = useState({});
    const [team1, setTeam1] = useState([]);
    const [team2, setTeam2] = useState([]);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cookies] = useCookies(['ANTE_UP_SESSION_TOKEN']);
    let history = useHistory();

    useEffect(() => {
        if(cookies.ANTE_UP_SESSION_TOKEN === undefined){
            history.push("/");
        }
        if (props.connection !== undefined) {
            props.connection.on("LobbyLeft", (lobbyLeave) => {
                console.log(lobbyLeave.player + " left the game. ")
                getWager();
            });
            props.connection.on("YouLeft", () => {
                console.log("You left");
                getWager();
            });
            props.connection.on("LobbyGone", () => {
                console.log("Lobby Gone");
                history.push("/");
            });
        }
        if(props.accountInfo.id === undefined ){
            if (props.api !== undefined && cookies.ANTE_UP_SESSION_TOKEN !== undefined) {
                props.api.get('account/info', {
                    params: {
                        token: cookies.ANTE_UP_SESSION_TOKEN
                    }
                }).then(res => {
                    let resInfo = {id: res.data.id, username: res.data.username, balance: res.data.balance};
                    props.dispatch(setAccountInfo(resInfo))
                })
            }
        }
        getWager()
    }, [props.id, props.api, props.connection]);

    useEffect(() =>
        () => props.connection ?
            props.connection.off("LobbyLeft") &&
            props.connection.off("YouLeft") &&
            props.connection.off("LobbyGone")
            : null, []);

    function getWager() {
        if (props.api !== undefined) {
            setLoading(true);
            props.api.get('/wager/'+ props.id).then(res => {
                setWager({
                    id: res.data.id,
                    ante: res.data.ante,
                    description: res.data.description,
                    hostId: res.data.hostId,
                    hostName: res.data.hostName,
                    playercap: res.data.playerCap,
                    title: res.data.title,
                    game: res.data.game,
                });
                setMessages(res.data.chat.messages);
                setTeam1(res.data.team1.players);
                setTeam2(res.data.team2.players);
                setLoading(false)
            })
        }

    }

    async function joinTeam(team) {
        setLoading(true);
        let token = cookies.ANTE_UP_SESSION_TOKEN;
        let lobby = wager.id;
        props.connection.on("LobbyJoined", (lobbyJoin) => {
            console.log(lobbyJoin.player + " joined team " + lobbyJoin.team)
            getWager();
        });

        await props.connection.invoke("JoinLobby", {token, lobby, team});
    }

    function playerCapToString() {
        let teamCap = wager.playercap / 2;
        return teamCap.toString() + "v" + teamCap.toString()
    }

    function fillSlots(team, number) {
        let teamCap = wager.playercap / 2;
        let emptySlots = teamCap - team.length;
        let items = [];
        for (let i = 0; i < emptySlots; i++) {
            if (i === 0 &&
                !team.some(player => player.id === props.accountInfo.id) &&
                cookies.ANTE_UP_SESSION_TOKEN !== undefined)
                items.push(<div style={{display: "flex", alignItems: "center"}} className={'lobbyBoxItem'}>
                    <DefaultButton onClick={() => joinTeam(number)}
                                   style={{marginRight: "10px", position: "absolute", right: "10px"}} text={"Join"}/>
                    <div style={{marginLeft: "10px", fontSize: "16px"}}>Empty</div>
                </div>);
            else {
                items.push(<div style={{display: "flex", alignItems: "center"}} className={'lobbyBoxItem'}>
                    <div style={{marginLeft: "10px", fontSize: "16px"}}>Empty</div>
                </div>);
            }
        }
        return items;
    }

    function kickButton(player) {
        if (wager.hostId === props.accountInfo.id &&
            player.id !== props.accountInfo.id) {
            return <DefaultButton style={{
                marginRight: "10px", position: "absolute",
                right: "10px"
            }} text={"Kick"} onClick={() => kickPlayer(player)}/>
        }
    };

    function leaveButton(player) {
        if (player.id === props.accountInfo.id) {
            return <DefaultButton style={{
                marginRight: "10px", position: "absolute",
                right: "10px"
            }} text={"Leave"} onClick={() => leaveLobby()}/>
        }
    }
    function startLobby(){
    }

    async function leaveLobby() {
        setLoading(true);
        let lobby = wager.id;
        let token = cookies.ANTE_UP_SESSION_TOKEN;

        await props.connection.invoke("LeaveLobby", {token, lobby});
    }
    async function kickPlayer(player){
        let user = player.id;
        let lobby = wager.id;
        let hostToken = cookies.ANTE_UP_SESSION_TOKEN;

        await props.connection.invoke("KickPlayer", {user, lobby, hostToken});
    }

    let boxHeight = (((wager.playercap / 2) * 50) + "px").toString();

    return loading ? <CenteredLoader/> : <div style={{marginTop:"2vw", marginBottom:"2vw"}}>
        <div style={{fontSize: "40px"}}>{wager.hostName}'s game</div>
        <div style={{fontSize: "20px", marginBottom: "10px"}}>{wager.game} ● {playerCapToString()} ● ${wager.ante}</div>
        <div style={{fontSize: "20px", marginBottom: "10px"}}>{wager.description}</div>
        <Separator/>
        <Row>
            <Col>
                <div style={{fontSize: "20px"}}>Team 1</div>
                <div style={{height: boxHeight}} className={"lobbyBox"}>
                    {team1.map(player =>
                        <div style={{display: "flex", alignItems: "center"}} className={'lobbyBoxItem'}>
                            <div style={{marginLeft: "10px", fontSize: "16px"}}><b>{player.username}</b></div>
                            {kickButton(player, 1)}
                            {leaveButton(player, 1)}
                        </div>
                    )}
                    {fillSlots(team1, 1).map(object => object)}
                </div>
            </Col>
            <Col>
                <div style={{fontSize: "20px"}}>Team 2</div>
                <div style={{height: boxHeight}} className={"lobbyBox"}>
                    {team2.map(player =>
                        <div style={{display: "flex", alignItems: "center"}} className={'lobbyBoxItem'}>
                            <div style={{marginLeft: "10px", fontSize: "16px"}}><b>{player.username}</b></div>
                            {kickButton(player, 2)}
                            {leaveButton(player, 2)}
                        </div>
                    )}
                    {fillSlots(team2, 2)}
                </div>
            </Col>
        </Row>
        {cookies.ANTE_UP_SESSION_TOKEN !== undefined ? <Row>
            <Col>
                <LobbyChatbox items={messages} lobbyId={wager.id}/>
            </Col>
            <Col>
                <div style={{height:"100%", display: "flex", flexDirection:"column", justifyContent: "flex-end", alignItems: "center"}}>
                    <PrimaryButton onClick={startLobby} text={"Start Game"}/>
                </div>
            </Col>
            <Col/>
        </Row> : <div/>}
    </div>

}

const mapStateToProps = (state) => {
    return {
        connection: getGlobalConnection(state),
        api: getAPI(state),
        wagerAPI: getWagerAPI(state),
        accountInfo: getAccountInfo(state)
    };
};
export default connect(mapStateToProps)(Lobby);