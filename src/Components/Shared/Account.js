import React from "react";
import {Link} from "react-router-dom";
import {Icon} from "@fluentui/react/lib/Icon";

class Account extends React.Component{

    render() {
        let linkText = "/account";
        const logged = false;
        if(!logged){
            linkText = "/login"
        }
        return <div>
            <Link to={linkText}>
                <Icon iconName={"Contact"}></Icon>
            </Link>
        </div>;    }
}

export default Account;