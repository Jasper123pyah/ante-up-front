import React, {useEffect, useState} from "react";
import {getAPI, getGlobalConnection} from "../../../../Core/Global/global.selectors";
import {connect} from "react-redux";
import {DefaultButton, PrimaryButton, Separator, TextField} from "@fluentui/react";
import {useHistory} from "react-router-dom";
import {useCookies} from "react-cookie";

function Settings(props){
    const [cookies, setCookie, removeCookie] = useCookies(['ANTE_UP_SESSION_TOKEN']);
    const [accountInfo, setAccountInfo] = useState({
        username: "",
        email: "",
    });

    let history = useHistory();

    async function LogOut(){
        if(props.connection !== undefined){
            try{
                let token = cookies.ANTE_UP_SESSION_TOKEN;
                await props.connection.invoke("Logout", token);
                removeCookie('ANTE_UP_SESSION_TOKEN')
                history.push("/");
                window.location.reload();
            }
            catch(e){
                console.log(e);
            }
        }else{
            window.location.reload();
        }
    }
    useEffect(() => {
        if(props.api !== undefined) {
            props.api.get('account/info').then(res => {
                let resInfo = {username: res.data.username, balance: res.data.balance, email: res.data.email};
                setAccountInfo(resInfo);
            })
        }
    },[props.api, history]);

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
        connection : getGlobalConnection(state),
        api : getAPI(state)
    };
};
export default connect(mapStateToProps)(Settings);
