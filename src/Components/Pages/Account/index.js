import React, {useEffect} from "react";
import AccountPivot from "./AccountPivot";
import {useCookies} from "react-cookie";
import {useHistory} from "react-router-dom";

function Account(props) {
    const [cookies] = useCookies(['ANTE_UP_SESSION_TOKEN']);
    let history = useHistory();

    useEffect(() => {
        if (cookies.ANTE_UP_SESSION_TOKEN === undefined) {
            history.push("/login");
        }
    });
    return <div>
        <div style={{fontSize: "40px",marginBottom: "10px"}}>Account</div>
        <AccountPivot pivot={props.pivot}/>
    </div>
}

export default Account;