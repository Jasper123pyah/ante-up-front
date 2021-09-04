import React from "react";
import {Link} from "react-router-dom";

class Logo extends React.Component{

    render() {
        return <div>
            <Link to={"/"}>
                <img src={"logo.png"} style={{height: "43px"}} alt={"Logo"}></img>
            </Link>
        </div>;
    }
}
export default Logo;