import React from "react";
import {PulseLoader} from "react-spinners";

function CenteredLoaderFS(){

    return<div style={{height:'100vh', width:'100vw'}}>
        <div style={{ position:"fixed", top:"45%", left:"45%", overflowX:"hidden"}}>
            <PulseLoader color={"#39ff13"} size={40}/>
        </div>
    </div>

}
export default CenteredLoaderFS;