import React, {useState} from "react";
import FriendsButton from "./FriendsButton";
import FriendPanel from "./FriendPanel";
import {useCookies} from "react-cookie";
import OutsideListener from "./OutsideListener";

function Friends(){

    const [panel, setPanel] = useState(false);
    const [cookies] = useCookies(['ANTE_UP_SESSION_TOKEN']);

    const handlePanel = () =>{
        if(panel === false)
            setPanel(true)
        else
            setPanel(false)
    }
    function showPanel(){
        if(panel)
            return<OutsideListener showPanel={handlePanel}><FriendPanel/></OutsideListener>
    }
    function showButton(){
        if(cookies.ANTE_UP_SESSION_TOKEN !== undefined){
            return <FriendsButton setPanel={handlePanel}/>
        }
    }
    return <div>
        {showButton()}
        {showPanel()}
    </div>
}
export default Friends;
