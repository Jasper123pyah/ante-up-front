import React from "react";
import { useHistory} from "react-router-dom";
import '../../Home.css'
function GameCard (props){
    let history = useHistory();

    function redirectToGame(){
        history.push("/game/"+props.name)
    }

    return <div  className={'gameCard'} onClick={redirectToGame} >
        <img style={{ width:'100%', borderRadius:'10px', display: "flex", alignItems:'flex-end'}} src={"./Images/"+props.img}/>
        <div className={'info'}>
            <div style={{marginLeft:'5px'}}>
                <div><b>{props.name}</b></div>
                <div>{props.playercount} Players</div>
            </div>
        </div>
    </div>


}
export default GameCard;