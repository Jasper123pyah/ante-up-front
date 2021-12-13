import * as React from 'react';
import {IconButton, List, Separator, TextField} from '@fluentui/react';
import {useEffect, useState} from "react";
import {getAPI, getGlobalConnection} from "../../Core/Global/global.selectors";
import {connect} from "react-redux";
import {useCookies} from "react-cookie";

function FriendChatbox(props) {
    const [items, setItems] = useState(props.messages);
    const [text, setText] = useState("");
    const [cookies] = useCookies(['ANTE_UP_SESSION_TOKEN']);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (props.connection !== undefined) {
            props.connection.on("NewFriendMessage", () => {
                getChat();
                gotoBottom();
            });
        }
        setItems(props.messages)
        gotoBottom()
    }, [props.connection, props.messages, props.name]);

    useEffect(() =>
        () => props.connection ? props.connection.off("NewFriendMessage") : null, []);

    function getChat(){
        if(props.api !== undefined){
            let friendName = props.name;
            props.api.get('/account/friend/chat/' + friendName).then(res => {
                setItems(res.data.messages);
                gotoBottom();
            }).catch(err => console.log(err.response.status))
        }
    }
    const renderItem = (item) => {
        let fullString= item.senderName + ": " + item.text
        return <div style={{marginLeft: "5px", width:"95%", overflowWrap:"break-word"}}>
            {fullString}
        </div>
    }

    function gotoBottom(){
        let element = document.getElementById("chat");
        element.scrollTop = element.scrollHeight - element.clientHeight;
    }

    async function sendMessage() {
        if(text.length > 0){
            let friendMessage = {
                sender: cookies.ANTE_UP_SESSION_TOKEN,
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

    function closeChat(){
        props.closeChat("");
    }
    if(items === undefined){
        getChat();
    };
    return <div className={"friendChatBox"}>
        <div style={{textAlign:"center", fontSize:"24px"}}>
            {props.name}
            <div style={{float:"right"}}>
                <IconButton onClick={closeChat} iconProps={{iconName:"Cancel"}}/>
            </div>
        </div>
        <Separator className={"separator"}/>
        <div id="chat" className={"fChatBox"}>
            {items.map(item => <div>{renderItem(item)}</div>)}
        </div>
        <div>
            <div style={{width: "90%", float: "left"}}>
                <TextField placeholder={"Send Message..."}
                           value={text}
                           onKeyPress={keyPress}
                           onChange={handleUserInput}
                />
            </div>
            <div style={{width: "10%",float: "right"}}>
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
