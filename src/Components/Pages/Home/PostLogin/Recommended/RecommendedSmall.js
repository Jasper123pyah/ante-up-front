import React from "react";
import fortniteRec from "../../../../../Images/fortniteRec.jpg";
import '../PostLogin.css'
import {useHistory} from "react-router-dom";

function RecommendedSmall(){
    let history = useHistory();

    return<div onClick={() => history.push("lobby/08d9b71e-24e2-4390-8649-192d9a8b2961")}  className={'recommendedSmall'}>
        <img className={'recommendedImage'} src={fortniteRec} style={{height:"100%", width:'100%'}}/>
        <div style={{position:"absolute", top:'10px', left:'10px', fontSize:'x-large'}}>Big Boys 4v4</div>
        <div style={{position:"absolute", top:'10px', right:'10px', fontSize:'x-large'}}>$200 Ante</div>
        <div style={{position:"absolute", bottom:'10px', left:'10px', fontSize:'medium', color:'#39ff13'}}>Hosted by Jasper</div>
        <div style={{position:"absolute", bottom:'10px', right:'10px', fontSize:'x-large'}}>6/8 Players</div>
    </div>
}

export default RecommendedSmall;