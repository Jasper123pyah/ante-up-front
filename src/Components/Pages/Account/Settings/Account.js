import React, {useEffect, useState} from "react";
import { getAPI} from "../../../../Core/Global/global.selectors";
import {connect} from "react-redux";
import {DefaultButton, PrimaryButton, Separator, TextField} from "@fluentui/react";
import {useHistory} from "react-router-dom";

function Account(){
    const [accountInfo, setAccountInfo] = useState({
        username: "",
        email: "",
    });

    let history = useHistory();

    const axios = require('axios');
    const api = axios.create({
        baseURL:'http://localhost:5000/',
        timeout: 10000
    });
    function LogOut(){
        localStorage.removeItem("ANTE_UP_SESSION_TOKEN");
        history.push("/");
        window.location.reload();
    }
    useEffect(() => {
        if(localStorage.getItem("ANTE_UP_SESSION_TOKEN") === null){
            history.push("/login");
        }
        else if(api !== undefined) {
            api.get('account/info', {
                params: {
                    id: localStorage.getItem("ANTE_UP_SESSION_TOKEN")
                }
            }).then(res => {
                let resInfo = {username: res.data.username, balance: res.data.balance, email: res.data.email};
                setAccountInfo(resInfo);
            })
        }
    },[api, history]);

    return<div>
        <div style={{fontSize:"20px"}}>Profile Settings</div>
        <div>Change identifying details for your account</div>
        <div className={"accountProfile"}>
            <div style={{height:"50px", display:"flex"}}>
                <div style={{width: "20%",marginLeft:"20px", marginTop:"10px"}}>
                    <b>Username</b>
                </div>
                <div style={{width:"70%",marginLeft:"20px", marginTop:"15px"}}>
                    <TextField defaultValue={accountInfo.username} />
                </div>
            </div>
            <Separator/>
            <div style={{height:"40px", display:"flex"}}>
                <div style={{width: "20%",marginLeft:"20px"}}>
                    <b>Email</b>
                </div>
                <div style={{width:"70%",marginLeft:"20px", marginTop:"5px"}}>
                    <TextField defaultValue={accountInfo.email} />
                </div>
            </div>
            <Separator/>
            <div>
                <div style={{width:"94%"}}>
                    <DefaultButton style={{ marginTop:"3px",marginLeft:"20px" }} text={"Log Out"} onClick={LogOut}/>
                    <PrimaryButton style={{float:"right",  marginTop:"3px"}} text={"Save Changes"}/>
                </div>
                <div style={{width:"6%"}}/>
            </div>
        </div>
        <div style={{fontSize:"20px"}}>Disabling Your Account</div>
        <div>Completely deactivate your account</div>
        <div className={"accountDisable"}>
            <div style={{height:"50px", display:"flex"}}>
                <div style={{width: "20%",marginLeft:"20px", marginTop:"15px"}}>
                    <b>Disable Account</b>
                </div>
                <div style={{width:"70%",marginLeft:"20px", marginTop:"15px"}}>
                    <DefaultButton style={{float:"right",  marginTop:"3px"}} text={"Disable"}/>
                </div>
            </div>
        </div>
    </div>
}
const mapStateToProps = (state) => {
    return {
        api : getAPI(state)
    };
};
export default connect(mapStateToProps)(Account);
