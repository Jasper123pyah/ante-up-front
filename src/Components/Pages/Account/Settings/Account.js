import React, {useEffect, useState} from "react";
import { getAPI} from "../../../../Core/Global/global.selectors";
import {connect} from "react-redux";
import {useCookies} from "react-cookie";
import {DefaultButton} from "@fluentui/react";
import {useHistory} from "react-router-dom";

function Account(){
    const [cookies, setCookie, removeCookie] = useCookies(["ANTE_UP_SESSION_TOKEN"]);
    const [accountInfo, setAccountInfo] = useState({
        username: "",
        balance: "",
        email: "",
    });

    let history = useHistory();

    const axios = require('axios');
    const api = axios.create({
        baseURL:'http://localhost:5000/',
        timeout: 10000
    });
    function LogOut(){
        removeCookie("ANTE_UP_SESSION_TOKEN");
        history.push("/");
        window.location.reload(false);
    }
    useEffect(() => {
        if(api !== undefined) {
            api.get('account/info', {
                params: {
                    id: cookies.ANTE_UP_SESSION_TOKEN
                }
            }).then(res => {
                let resInfo = {username: res.data.username, balance: res.data.balance, email: res.data.email};
                setAccountInfo(resInfo);
            })
        }
    });

    return<div>
        {accountInfo.username}
        <DefaultButton text={"Log Out"} onClick={LogOut}/>
    </div>
}
const mapStateToProps = (state) => {
    return {
        api : getAPI(state)
    };
};
export default connect(mapStateToProps)(Account);
