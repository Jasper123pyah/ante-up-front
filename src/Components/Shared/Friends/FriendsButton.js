import React from "react";
import {FontIcon} from "@fluentui/react";
import "./Friends.css";

function FriendsButton(props){

    function toggleFriendPanel(){
        props.setPanel()
    }

    return <div className={"friendsButton"}>
        <div onClick={toggleFriendPanel}className={"roundedFixedBtn"}>
            <FontIcon className={"friendsIcon"} iconName={"ChatInviteFriend"}/>
        </div>
    </div>
}
export default FriendsButton;