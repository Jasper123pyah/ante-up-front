import React from "react";
import fortniteRec from "../../../../../Images/fortniteRec.jpg";
import '../PostLogin.css'
import {useHistory} from "react-router-dom";

function RecommendedMed(){
    let history = useHistory();

    return<div onClick={() => history.push("lobby/08d9b71e-24e2-4390-8649-192d9a8b2961")}  className={"recommendedMed"}>
        <img className={'recommendedImage'} src={fortniteRec} style={{height:"auto", width:'100%'}}/>
        <div style={{position:"absolute", top:'10px', left:'10px', fontSize:'x-large'}}>Big Boys 4v4</div>
        <div style={{position:"absolute", top:'10px', right:'10px', fontSize:'x-large'}}>$200 Ante</div>
        <div style={{position:"absolute", bottom:'10px', left:'10px', fontSize:'medium', color:'#39ff13'}}>Hosted by Jasper</div>
        <div style={{position:"absolute", bottom:'10px', right:'10px', fontSize:'x-large'}}>6/8 Players</div>
        <div style={{position:"absolute", bottom:'40px', left:'10px', fontSize:'large'}}>"Come play for a $1600 prize pot.<br/> Only good players allowed."</div>
    </div>
}

export default RecommendedMed;