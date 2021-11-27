import React from "react";
import {useCookies} from "react-cookie";

function PreLoginHome(){
    const [cookies, setCookie, removeCookie] = useCookies(["ANTE_UP_SESSION_TOKEN"]);

    return <div>

    </div>
}
export default PreLoginHome;
