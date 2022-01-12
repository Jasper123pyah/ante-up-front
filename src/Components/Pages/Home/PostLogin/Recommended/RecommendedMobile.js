import React from "react";
import fortniteRec from "../../../../../Images/fortniteRec.jpg";
import './Recommended.css'
import {useHistory} from "react-router-dom";

function RecommendedMobile(){

    let history = useHistory();

    return<div onClick={() => history.push("lobby/08d9b71e-24e2-4390-8649-192d9a8b2961")}>
        <img className={'recommendedImage'} src={fortniteRec} style={{height:"auto", width:'100%'}}/>
        <div style={{position:"absolute", top:'0px', left:'10px', fontSize:'xxx-large'}}>Big Boys 4v4</div>
        <div style={{position:"absolute", top:'60px', left:'10px', fontSize:'xxx-large'}}>$200 Ante</div>
        <div style={{position:"absolute", bottom:'25px', left:'10px', fontSize:'xx-large'}}>6/8 Players</div>
        <div style={{position:"absolute", bottom:'5px', left:'10px', fontSize:'large', color:'#39ff13'}}>Hosted by Jasper</div>
    </div>
}

export default RecommendedMobile;