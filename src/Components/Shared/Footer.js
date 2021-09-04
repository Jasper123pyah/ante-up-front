import React from "react";
import {getTheme} from "../../Core/Global/global.selectors";
import {connect} from "react-redux";
import {Separator} from "@fluentui/react";

class Footer extends React.Component{

    render(){
        let backGroundColor = "#1e1f21";
        if(!this.props.theme){
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
const mapStateToProps = (state) => {
    return {
        theme : getTheme(state)
    };
};
export default connect(mapStateToProps)(Footer);
