import React from "react";
import {Link} from "react-router-dom";

class Logo extends React.Component{

    render() {
        return <div>
            <Link to={"/"}>
                <img src={"logo.png"} style={{height: "45px"}} ></img>
            </Link>
        </div>;
    }
}
export default Logo;