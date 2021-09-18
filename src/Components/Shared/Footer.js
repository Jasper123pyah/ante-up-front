import React from "react";
import {connect} from "react-redux";
import {Separator} from "@fluentui/react";

class Footer extends React.Component{

    render(){
        let backGroundColor = "#1e1f21";
        if(localStorage.getItem('darkMode') === 'false'){
            backGroundColor = "#ffffff"
        }

        return<div style={{background: backGroundColor}}className={"footer"}>
            <Separator className={"separator"}/>
            <span style={{fontSize: "15px"}}>
                Bottomtext
            </span>
        </div>
    }
}

export default Footer;
