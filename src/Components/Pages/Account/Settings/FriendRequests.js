import React, {useEffect, useState} from "react";
import {DetailsList, DetailsListLayoutMode, IconButton, SelectionMode, Separator, TextField} from "@fluentui/react";
import {getAPI, getGlobalConnection} from "../../../../Core/Global/global.selectors";
import {connect} from "react-redux";

function FriendRequestList(props){

    const [text, setText] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [friendRequests, setFriendRequests] = useState([]);

    useEffect(() => {
        getFriendRequests();
        if (props.connection !== undefined) {
            props.connection.on("AddFriendError", (result) => {
                setErrorMessage(result);
            });
            props.connection.on("FriendRequest Sent", (friendName) =>{
                setText("");
            });
        }
    },[props.api]);
    useEffect(() =>
        () => props.connection ?
            props.connection.off("AddFriendError") &&
            props.connection.off("FriendRequest Sent") :
            null, []);

    function respondFriendRequest(friendName, input){
        props.api.post("account/friendrequest", {
            accepted: input,
            friendName: friendName,
            token: localStorage.getItem("ANTE_UP_SESSION_TOKEN")
        }).then(() => getFriendRequests())
    }

    function getFriendRequests(){
        let token = localStorage.getItem("ANTE_UP_SESSION_TOKEN");
        if(props.api !== undefined) {
            props.api.get("account/friendrequests/"+token).then(res => {
                setFriendRequests(res.data);
            })
        }
    }
    function _getKey(item, index){
        return item.key;
    }
    const handleText = (e, value) => {
        setText(value)
        setErrorMessage("");
    }
    const keyPress = (e) =>{
        if(e.charCode === 13){
            addFriend();
        }
    }
    async function addFriend(){
        if(text.length > 0){
            let hubFriend = {
                friendName: text,
                token: localStorage.getItem("ANTE_UP_SESSION_TOKEN"),
            }
            await props.connection.invoke("SendFriendRequest", hubFriend)
            setText("");
        }
    }
    return<div>
        <div>
            <div style={{width: "90%", float: "left"}}>
                <TextField errorMessage={errorMessage} placeholder={"Add friend..."}
                           value={text}
                           onKeyPress={keyPress}
                           onChange={handleText}/>
            </div>
            <div style={{width: "10%", paddingLeft:"7px",float: "right"}}>
                <IconButton iconProps={{iconName: 'Add'}} onClick={addFriend}/>
            </div>
        </div>
        <div><b>Friend Requests</b></div>
        <Separator/>
        {friendRequests.map(item => <div>
            <div style={{float: "left", fontSize:"14px"}}>
                {item}
            </div>
            <div style={{float: "right"}}>
                <IconButton iconProps={{iconName: 'Cancel'}} onClick={() => respondFriendRequest(item, false)}/>
                <IconButton iconProps={{iconName: 'CheckMark'}} onClick={() => respondFriendRequest(item, true)}/>
            </div>
        </div>)}
    </div>
}
const mapStateToProps = (state) => {
    return {
        connection : getGlobalConnection(state),
        api : getAPI(state)
    };
};

export default connect(mapStateToProps)(FriendRequestList);