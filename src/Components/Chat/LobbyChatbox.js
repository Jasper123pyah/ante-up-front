import * as React from 'react';
import {IconButton, List, TextField} from '@fluentui/react';
import {useEffect, useState} from "react";
import {getAPI, getGlobalConnection} from "../../Core/Global/global.selectors";
import {connect} from "react-redux";

function LobbyChatbox(props) {
    const [items, setItems] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        if (props.connection !== undefined) {
            props.connection.on("NewLobbyMessage", () => {
                getChat();
                gotoBottom();
            });
        }
        setItems(props.items)
        gotoBottom()
    }, [props.connection, props.items]);

    useEffect(() =>
        () => props.connection ? props.connection.off("NewLobbyMessage") : null, []);

    function getChat(){
        let id = props.lobbyId
        if(props.api !== undefined){
            props.api.get('/wager/chat', { params: { id }}).then(res => {
                setItems(res.data.messages);
                gotoBottom();
            })
        }
    }

    function gotoBottom(){
        let element = document.getElementById("chat");
        element.scrollTop = element.scrollHeight - element.clientHeight;
    }

    async function sendMessage() {
        if(text.length > 0){
            let lobbyMessage = {
                lobbyid: props.lobbyId,
                sender: localStorage.getItem("ANTE_UP_SESSION_TOKEN"),
                message: text
            }
            await props.connection.invoke("SendLobbyMessage", lobbyMessage);
            setText("");
        }
    }

    const handleUserInput = (e) => {
        setText(e.target.value);
    };

    const keyPress = (e) =>{
        if(e.charCode === 13){
            sendMessage()
        }
    }
    const onRenderCell = (item) => {
        let fullString= item.senderName + ": " + item.text
        return <div style={{marginLeft: "5px", width:"95%", overflowWrap:"break-word"}}>
            {fullString}
        </div>
    }

    return <div>
        <div id="chat" className={"lChatBox"}>
            <List
                items={items}
                onRenderCell={onRenderCell}
            />
        </div>
        <div>
            <div style={{width: "90%", float: "left"}}>
                <TextField placeholder={"Send Message..."}
                           value={text}
                           onKeyPress={keyPress}
                           onChange={handleUserInput}
                />
            </div>
            <div style={{width: "10%", paddingLeft:"7px",float: "right"}}>
                <IconButton iconProps={{iconName: 'Send'}} onClick={() => sendMessage()}/>
            </div>
        </div>
    </div>
};

const mapStateToProps = (state) => {
    return {
        connection: getGlobalConnection(state),
        api: getAPI(state)
    };
};
export default connect(mapStateToProps)(LobbyChatbox);
