import * as React from 'react';
import {IconButton, List, TextField} from '@fluentui/react';
import {useEffect, useState} from "react";
import {getGlobalConnection} from "../../Core/Global/global.selectors";
import {connect} from "react-redux";

const onRenderCell = (item) => {
    return <div style={{marginLeft: "5px"}}>
        <div>
            {item.sender}: {item.text}
        </div>
    </div>
}

function ChatBox(props) {

    const [items, setItems] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (props.connection !== undefined) {
            props.connection.on("NewMessage", (message) => {
                console.log(message);
                setItems(items => [...items, {sender: message.sender, text: message.message}])
            });
        }
        setItems(props.items)
    }, [props.connection, props.items]);

    useEffect(() =>
        () => props.connection ? props.connection.off("NewMessage") : null, []);

    async function sendMessage() {
        let lobbyMessage = {
            lobbyid: props.lobbyId,
            sender: localStorage.getItem("ANTE_UP_SESSION_TOKEN"),
            message: message
        }
        await props.connection.invoke("SendMessage", lobbyMessage);
    }

    return <div style={{width: "35%"}}>
        <div className={"chatBox"}>
            <List
                items={items}
                onRenderCell={onRenderCell}
            />
        </div>
        <div>
            <div style={{width: "90%", float: "left"}}>
                <TextField placeholder={"Send Message..."} onChange={
                    (e, value) => setMessage(value)}
                />
            </div>
            <div style={{width: "10%", float: "right"}}>
                <IconButton iconProps={{iconName: 'Send'}} onClick={() => sendMessage()}/>
            </div>
        </div>
    </div>
};

const mapStateToProps = (state) => {
    return {
        connection: getGlobalConnection(state)
    };
};
export default connect(mapStateToProps)(ChatBox);
