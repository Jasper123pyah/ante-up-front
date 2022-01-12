import React from "react";
import MobileLobbies from "./MobileLobbies";
import Lobbies from "./Lobbies";

function LobbiesIndex(props) {
    if(window.innerWidth < 500){
        return <MobileLobbies gameName={props.gameName}/>
    }else{
        return <Lobbies gameName={props.gameName}/>
    }
}
export default LobbiesIndex;