import React from "react";
import {IconButton, Separator} from "@fluentui/react";

function FriendRequest(props){


    function respondFriendRequest(friendName, input){
        props.api.post("account/friendrequest", {
            accepted: input,
            friendName: friendName
        }).then(() => props.getRequests())
    }

   return <div>
       <div style={{width:"100%", height:"35px"}}>
           <div style={{paddingLeft:"10px", marginTop:"4px", float: "left", fontSize:"16px"}}>
               {props.name}
           </div>
           <div style={{float: "right"}}>
               <IconButton iconProps={{iconName: 'Cancel'}} onClick={() => respondFriendRequest(props.name, false)}/>
               <IconButton iconProps={{iconName: 'CheckMark'}} onClick={() => respondFriendRequest(props.name, true)}/>
           </div>
       </div>
   </div>
}

export default FriendRequest;