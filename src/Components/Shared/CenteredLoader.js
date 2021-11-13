import React from "react";
import {PulseLoader} from "react-spinners";

function CenteredLoader(){

    return<div style={{position:"fixed", top:"45%", left:"45%", overflowX:"hidden"}}>
        <PulseLoader color={"#39ff13"} size={40}/>
    </div>
}
export default CenteredLoader;