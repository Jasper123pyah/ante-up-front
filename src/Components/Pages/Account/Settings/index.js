import React, {useEffect} from "react";
import AccountPivot from "./AccountPivot";
import {useCookies} from "react-cookie";
import {useHistory} from "react-router-dom";

function Account(props){
    const [cookies, removeCookie] = useCookies(['ANTE_UP_SESSION_TOKEN']);
    let history = useHistory();

    useEffect(() => {
        if(cookies.ANTE_UP_SESSION_TOKEN === undefined){
            history.push("/login");
        }
    });
    return <div>
        <div>
            <div style={{fontSize:"40px", marginLeft:"15px", marginBottom:"10px"}}>Account</div>
            <AccountPivot></AccountPivot>
        </div>
    </div>
}

export default Account;