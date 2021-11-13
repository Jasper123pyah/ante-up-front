import React from "react";
import AccountPivot from "./AccountPivot";
import {Col, Row} from "react-grid-system";

function Account(props){
    return <div>
        <div>
            <div style={{fontSize:"40px", marginLeft:"15px", marginBottom:"10px"}}>Account</div>
            <AccountPivot></AccountPivot>
        </div>
    </div>
}

export default Account;