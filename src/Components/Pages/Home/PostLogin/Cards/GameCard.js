import React from "react";
import { useHistory} from "react-router-dom";
import '../../Home.css'
import { GetImage} from "../../../../../Core/FirebaseImages/FirebaseImage";

function GameCard (props){
    let history = useHistory();

    function redirectToGame(){
        history.push("/game/"+props.name)
    }

    return <div className={'gameCard'} onClick={redirectToGame}>
        <img style={{ width:'100%', borderRadius:'10px', display: "flex", alignItems:'flex-end'}} src={GetImage("CardImages", props.img)}/>
        <div className={'info'}>
            <div style={{marginLeft:'5px'}}>
                <div><b>{props.name}</b></div>
                <div>{props.wagers} wager{props.wagers !== 1 ? "s" : ""}</div>
            </div>
        </div>
    </div>


}
export default GameCard;