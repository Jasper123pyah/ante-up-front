import React, {useState} from "react";
import FriendsButton from "./FriendsButton";
import FriendPanel from "./FriendPanel";

function Friends(){

    const [panel, setPanel] = useState(false);

    const handlePanel = () =>{
        if(panel === false)
            setPanel(true)
        else
            setPanel(false)
    }
    function showPanel(){
        if(panel)
            return <FriendPanel/>
    }
    function showButton(){
        if(localStorage.getItem("ANTE_UP_SESSION_TOKEN") !== null){
            return <FriendsButton setPanel={handlePanel}/>
        }
    }
    return <div>
        {showButton()}
        {showPanel()}
    </div>
}
export default Friends;
