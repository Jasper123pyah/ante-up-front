import * as React from 'react';
import {IconButton, List, TextField} from '@fluentui/react';
import {useEffect, useState} from "react";
import {getAPI, getGlobalConnection} from "../../Core/Global/global.selectors";
import {connect} from "react-redux";

const onRenderCell = (item) => {
    let fullString= item.sender + ": " + item.text
    return <div style={{marginLeft: "5px", width:"95%", overflowWrap:"break-word"}}>
        {fullString}
    </div>
}

function FriendChatbox(props) {
    const [items, setItems] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        if (props.connection !== undefined) {
            props.connection.on("NewFriendMessage", () => {
                getChat();
                gotoBottom();
            });
        }
        setItems(props.items)
        gotoBottom()
    }, [props.connection, props.items]);

    useEffect(() =>
        () => props.connection ? props.connection.off("NewFriendMessage") : null, []);

    function getChat(){
        if(props.api !== undefined){
            let friendName = props.name;
            let token = localStorage.getItem("ANTE_UP_SESSION_TOKEN");
            props.api.get('/account/friend/chat', {friendName : friendName, token: token}).then(res => {
                setItems(res.data.message);
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
            let friendMessage = {
                sender: localStorage.getItem("ANTE_UP_SESSION_TOKEN"),
                receiver: props.name,
                message: text
            }
            await props.connection.invoke("SendFriendMessage", friendMessage);
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

    return <div>
        <div>
            Chat with {props.name}
        </div>
        <div id="chat" className={"chatBox"}>
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
export default connect(mapStateToProps)(FriendChatbox);
