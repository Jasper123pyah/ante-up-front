import React, {useEffect, useState} from "react";
import {
    Text,
    Callout,
    IconButton,
    TextField
} from "@fluentui/react";
import {getAPI, getGlobalConnection} from "../../../Core/Global/global.selectors";
import {connect} from "react-redux";
import FriendRequest from "./FriendRequest";

function FriendRequestList(props){

    const [text, setText] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [friendRequests, setFriendRequests] = useState([]);
    const [addedName, setAddedName] = useState("");

    useEffect(() => {
        getFriendRequests();
        if (props.connection !== undefined) {
            props.connection.on("AddFriendError", (result) => {
                setErrorMessage(result);
            });
            props.connection.on("FriendRequest Sent", (friendName) =>{
                setText("");
                setAddedName(friendName);
            });
        }
    },[props.api]);
    useEffect(() =>
        () => props.connection ?
            props.connection.off("AddFriendError") &&
            props.connection.off("FriendRequest Sent") :
            null, []);



    function getFriendRequests(){
        if(props.api !== undefined) {
            props.api.get("account/friendrequests").then(res => {
                setFriendRequests(res.data);
            })
        }
    }

    const handleText = (e, value) => {
        setText(value)
        setErrorMessage("");
        setAddedName("");
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
        <div style={{paddingLeft: "10px", marginTop:"10px", height:"35px"}}>
            <div style={{width: "90%", float: "left"}}>
                <TextField errorMessage={errorMessage} placeholder={"Add friend..."}
                           value={text}
                           onKeyPress={keyPress}
                           onChange={handleText}
                           id={"textField"}
                />
            </div>
            <div style={{width:"10%", float: "right"}}>
                <IconButton iconProps={{iconName: 'Add'}} onClick={addFriend}/>
            </div>
        </div>
        {addedName !== "" ? <div style={{color:"#39ff13", marginLeft:"10px"}}>Friendrequest sent to {addedName}.</div> : <div/>}
        {friendRequests.length === 0 ?
            <div style={{marginTop:"20px", textAlign:"center"}}>You have no new friendrequests.</div> :
            friendRequests.map(item => <FriendRequest getRequests={getFriendRequests} api={props.api} name={item}/>)}
    </div>
}
const mapStateToProps = (state) => {
    return {
        connection : getGlobalConnection(state),
        api : getAPI(state)
    };
};

export default connect(mapStateToProps)(FriendRequestList);