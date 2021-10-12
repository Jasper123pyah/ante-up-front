import React, {useEffect, useState} from "react";
import {Col, Row} from "react-grid-system";
import {Dropdown, PrimaryButton,  TextField} from "@fluentui/react";
import {getAPI, getGlobalConnection} from "../../../Core/Global/global.selectors";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
function CreateLobby(props){
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [ante, setAnte] = useState("");
    const [selectedGame, setSelectedGame] = useState("");
    const [selectedLobbySize, setSelectedLobbySize] = useState("");
    const [creationError, setCreationError] = useState("");
    const [dropDownItems, setDropDownItems] = useState([]);
    let history = useHistory();
    const lobbySizes = [
        {key: '1v1', text:"1v1"},
        {key: '2v2', text:"2v2"},
        {key: '3v3', text:"3v3"},
        {key: '4v4', text:"4v4"},
        {key: '5v5', text:"5v5"},
        {key: '6v6', text:"6v6"},
    ];

    useEffect(() => {
        getGames();
    },[]);

    function getGames(){
        if(props.api !== undefined)
        {
            props.api.get('game/gamenames').then(res => {
                res.data.map(gameName => {
                    dropDownItems.push({
                        key:gameName,
                        text:gameName
                    })
                })
            })
        }
    }
    function CheckForErrors(wager){
        if(wager.title===""||wager.description===""||wager.ante===""||wager.game===""||wager.lobbysize===""){
            return "Please fill in all fields.";
        }
        else{
            return "";
        }
    }

    function createWager(){
        let wager ={
            title: title,
            description: desc,
            ante: ante,
            game: selectedGame,
            lobbysize: selectedLobbySize
        }
        if(CheckForErrors(wager) === ""){
            props.api.post("/wager/create", {
                title: title,
                description: desc,
                ante: ante,
                game: selectedGame,
                lobbysize: selectedLobbySize,
                creatorid: localStorage.getItem("ANTE_UP_SESSION_TOKEN")
            }).then(res => {
                if(res.data !== ""){
                    let lobby = res.data
                    let user = localStorage.getItem("ANTE_UP_SESSION_TOKEN")
                    let team = 1;
                    props.connection.invoke("CreateLobby", {user, lobby,  team});
                    history.push("/lobby/"+lobby);
                }
            })
        }
        else{
            setCreationError(CheckForErrors(wager))
        }
    }
    const validateNumbers = (value) =>{
        const re = /[0-9]/;
        return re.test(value);
    }
    const onChangeAnte = React.useCallback((event, newValue?) => {
            if (!newValue || newValue.length <= 5 && validateNumbers(newValue.slice(-1))) {
                setAnte(newValue || '');
                setCreationError("");
            }
        }, [],
    );

    return <div>
        <Row>
            <Col/>
            <Col sm={12} md={8} lg={8}>
                <div style={{fontSize:"40px"}}>Create a wager</div>
                <Dropdown
                    placeholder={"Select Game"}
                    style={{width:"30%"}}label={"Game"}
                    options={dropDownItems}
                    onChange={(e, option) => {
                        setSelectedGame(option.text);
                        setCreationError("");
                    }}
                />
                <TextField label={"Name"} onChange={(e, value) =>{
                    setTitle(value);
                    setCreationError("");
                }} />
                <TextField multiline rows={3} label="Description" onChange={(e, value) =>{
                    setDesc(value);
                    setCreationError("");
                }} />
                <Row>
                    <Col>
                        <Dropdown
                            placeholder={"Select Lobby Size"}
                            label={"Lobby Size"}
                            options={lobbySizes}
                            onChange={(e, option) =>{
                                setSelectedLobbySize(option.text);
                                setCreationError("");}}
                        />
                    </Col>
                    <Col>
                        <TextField
                            value={ante}
                            onChange={onChangeAnte}
                            prefix="$"
                            label="Ante"
                        />
                    </Col>
                    <Col>
                        <PrimaryButton
                            style={{position:"absolute", right:15, bottom:0}}
                            text={"Create"}
                            onClick={createWager}
                        />
                    </Col>
                </Row>
                <div style={{color:"#a4262c", float:"right"}}>{creationError}</div>
            </Col>
            <Col/>
        </Row>
    </div>
}

const mapStateToProps = (state) => {
    return {
        connection : getGlobalConnection(state),
        api : getAPI(state)
    };
};

export default connect(mapStateToProps)(CreateLobby);