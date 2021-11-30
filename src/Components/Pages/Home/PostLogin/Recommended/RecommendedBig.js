import React from "react";
import fortniteRec from "../../../../../Images/fortniteRec.jpg";
import './Recommended.css'
import {useHistory} from "react-router-dom";

function RecommendedBig(){

    let history = useHistory();

    return<div onClick={() => history.push("lobby/08d9b3d5-5f7b-4e90-8654-2b646f9d6257")} className={'recommendedBig'}>
        <img className={'recommendedImage'} src={fortniteRec} style={{height:"100%", width:'100%'}}/>
        <div style={{position:"absolute", top:'10px', left:'10px', fontSize:'xxx-large'}}>Big Boys 4v4</div>
        <div style={{position:"absolute", top:'10px', right:'10px', fontSize:'xxx-large'}}>$200 Ante</div>
        <div style={{position:"absolute", bottom:'10px', left:'10px', fontSize:'large', color:'#39ff13'}}>Hosted by Jasper</div>
        <div style={{position:"absolute", bottom:'10px', right:'10px', fontSize:'xx-large'}}>6/8 Players</div>
        <div style={{position:"absolute", bottom:'40px', left:'10px', fontSize:'x-large'}}>"Come play for a $1600 prize pot.<br/> Only good players allowed."</div>
    </div>
}

export default RecommendedBig;