import React, {useState} from "react";
import {Pivot, PivotItem} from "@fluentui/react";
import FriendList from "./FriendList";
import FriendRequestList from "./FriendRequests";
import FriendChatBox from "../../Chat/FriendChatBox";
import {getAPI} from "../../../Core/Global/global.selectors";
import {connect} from "react-redux";

function FriendPanel(props){
    const [chatName, setChatName] = useState("");
    const [chatMessages, setChatMessages] = useState([]);
    const handleChat = (newName) =>{
        if(chatName == newName){
            setChatName("");
        }
        else{
            setChatName(newName);
            if(newName !== ""){
                getChat(newName)
            }
        }
    }
    function getChat(friendName){
        if(props.api !== undefined){
            props.api.get('/account/friend/chat'+ friendName).then(res => {
                setChatMessages(res.data.messages);
            }).catch(err => console.log(err.response.status))
        }
    }

    return <div>
        <div>
            {chatName !== "" ? <FriendChatBox messages={chatMessages} closeChat={handleChat} name={chatName}/> : null}
        </div>
        <div className={"friendPanel"} id={"friendPanel"}>
            <Pivot>
                <PivotItem headerText="Friends">
                    <FriendList setChat={handleChat}/>
                </PivotItem>
                <PivotItem headerText="Friend Requests">
                    <FriendRequestList/>
                </PivotItem>
            </Pivot>
        </div>
    </div>
}
const mapStateToProps = (state) => {
    return {
        api: getAPI(state)
    };
};
export default connect(mapStateToProps)(FriendPanel);