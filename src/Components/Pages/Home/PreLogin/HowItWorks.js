import React from "react";
import "./PreLogin.css";

function HowItWorks(){

    return<div style={{marginTop:'5vh', marginBottom:"6vh"}}>
        <div className={'title'}>How it works</div>
        <div style={{ display:'flex', justifyContent:'center'}}>
            <div className={'howItWorksCard centered'}>
                Create/Join a lobby.
            </div>
            <div className={'howItWorksCard centered'}>
                Play a match with your opponent.
            </div>
            <div className={'howItWorksCard centered'}>
                Win the match and get money.
            </div>
        </div>

    </div>
}
export default HowItWorks;