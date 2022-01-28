import React, {useEffect, useState} from "react";
import {Col, Row} from "react-grid-system";
import {Dropdown, PrimaryButton, TextField} from "@fluentui/react";
import {getAccountInfo, getAPI, getGlobalConnection} from "../../../../Core/Global/global.selectors";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import './CreateWager.css';
import CenteredLoader from "../../../Shared/CenteredLoader";
import InWagerModal from "./InWagerModal";

function CreateLobby(props) {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [ante, setAnte] = useState("");
    const [selectedGame, setSelectedGame] = useState("");
    const [selectedLobbySize, setSelectedLobbySize] = useState("");
    const [creationError, setCreationError] = useState("");
    const [dropDownItems, setDropDownItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showInWagerModal, setShowInWagerModal] = useState(false);
    let history = useHistory();
    const lobbySizes = [
        {key: '1v1', text: "1v1"},
        {key: '2v2', text: "2v2"},
        {key: '3v3', text: "3v3"},
        {key: '4v4', text: "4v4"},
        {key: '5v5', text: "5v5"},
        {key: '6v6', text: "6v6"},
    ];

    useEffect(() => {
        getGames();
    }, [props.api]);

    function getGames() {
        if (props.api !== undefined) {
            setLoading(true);
            props.api.get('game/names').then(res => {
                res.data.map(gameName => {
                    dropDownItems.push({
                        key: gameName,
                        text: gameName
                    })
                    setLoading(false);
                })
            })
        }
    }

    function CheckForErrors(wager) {
        if (wager.title === "" || wager.description === "" || wager.ante === "" || wager.game === "" || wager.lobbysize === "") {
            return "Please fill in all fields.";
        } else {
            return "";
        }
    }

    function createWager() {
        let wager = {
            title: title,
            description: desc,
            ante: ante,
            game: selectedGame,
            lobbysize: selectedLobbySize
        }
        if (CheckForErrors(wager) === "") {
            if(props.accountInfo.inWager){
                setShowInWagerModal(true);
            }
            else{
                postWager();
            }
        } else {
            setCreationError(CheckForErrors(wager))
        }
    }
    function postWager(){
        setLoading(true);
        if(props.api !== undefined){
            props.api.post("/wager", {
                title: title,
                description: desc,
                ante: ante,
                game: selectedGame,
                lobbysize: selectedLobbySize
            }).then(res => {
                let lobbyId = res.data;
                props.setModal();
                props.connection.invoke("CreateLobby", lobbyId);
                setLoading(false);
                history.push("/lobby/" + lobbyId);
            })
        }
    }

    const validateNumbers = (value) => {
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

    return <div style={{overflowX:"hidden", maxWidth:'100%'}}>
        <div style={{paddingBottom: "2vw", paddingRight: '2vw', paddingLeft: '2vw', textAlign: "left"}}>
            {loading ? <CenteredLoader/> : <div>
                <InWagerModal postWager={postWager} show={showInWagerModal}/>
                <div style={{fontSize: "40px"}}>Create a wager</div>
                <Dropdown
                    placeholder={"Select Game"}
                    label={"Game"}
                    options={dropDownItems}
                    onChange={(e, option) => {
                        setSelectedGame(option.text);
                        setCreationError("");
                    }}
                />
                <TextField label={"Name"} onChange={(e, value) => {
                    setTitle(value);
                    setCreationError("");
                }}/>
                <TextField multiline rows={3} label="Description" onChange={(e, value) => {
                    setDesc(value);
                    setCreationError("");
                }}/>
                <Row>
                    <Col sm={12} md={4} lg={4}>
                        <Dropdown
                            placeholder={"Select Lobby Size"}
                            label={"Lobby Size"}
                            options={lobbySizes}
                            onChange={(e, option) => {
                                setSelectedLobbySize(option.text);
                                setCreationError("");
                            }}
                        />
                    </Col>
                    <Col sm={12} md={4} lg={4}>
                        <TextField
                            value={ante}
                            onChange={onChangeAnte}
                            prefix="$"
                            label="Ante"
                        />
                    </Col>
                    <Col sm={12} md={4} lg={4}>
                        <div className={'createButton'}>
                            <PrimaryButton
                                text={"Create"}
                                onClick={createWager}
                            />
                        </div>
                    </Col>
                </Row>
                <div className={'creationError'}>{creationError}</div>
            </div>}
        </div>
    </div>
}

const mapStateToProps = (state) => {
    return {
        connection: getGlobalConnection(state),
        api: getAPI(state),
        accountInfo: getAccountInfo(state)
    };
};

export default connect(mapStateToProps)(CreateLobby);