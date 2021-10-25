import React, {useEffect} from "react";
import {connect} from "react-redux";
import { CommandBar } from '@fluentui/react/lib/CommandBar';
import {getAccountInfo, getAPI} from "../../Core/Global/global.selectors";
import "../../App.css"
import Logo from "./Logo";
import {initializeIcons} from "@fluentui/font-icons-mdl2";
import {useHistory} from "react-router-dom";
import {setAccountInfo} from "../../Core/Global/global.actions";

initializeIcons();
const axios = require('axios');
const api = axios.create({
    baseURL:'http://localhost:5000/',
    timeout: 10000
});

function Header(props){
    let history = useHistory();

    useEffect(() => {
        if(api !== undefined && localStorage.getItem("ANTE_UP_SESSION_TOKEN") !== null) {
            api.get('account/info', {
                params: {
                    id: localStorage.getItem("ANTE_UP_SESSION_TOKEN")
                }
            }).then(res => {
                let resInfo = {username: res.data.username, balance: res.data.balance};
                props.dispatch(setAccountInfo(resInfo))
            })
        }
    },[]);

    function handleAccount() {
        if(localStorage.getItem("ANTE_UP_SESSION_TOKEN") !== null){
            history.push("/settings");
        }
        else{
            history.push("/login");
        }
    }

    function handleCreate(){
        history.push("/createlobby")
    }

    function setDarkTheme(){
        if(localStorage.getItem('darkMode') === "true"){
            localStorage.setItem('darkMode', 'false')
        }
        else{
            localStorage.setItem('darkMode', 'true')
        }
        window.location.reload();
    }

    let _items =[
        {
            key:"Home",
            onRender: () => <Logo/>
        }
    ]

    let _farItems = [
        {
            key: 'darkMode',
            text:'Dark Mode',
            ariaLabel:'Dark Mode',
            iconOnly: true,
            cacheKey: 'myCacheKey', // changing this key will invalidate this item's cache
            iconProps: { iconName: 'Contrast' },
            onClick: setDarkTheme
        },
        {
            key: 'Wager',
            text: "Wager",
            iconProps: { iconName: 'Add' },
            onClick: handleCreate
        },
        {
            key: 'account',
            text: props.accountInfo.username + " - $ " + props.accountInfo.balance.toString(),
            iconProps: { iconName: 'Contact' },
            onClick: handleAccount
        },
    ];
    if(localStorage.getItem("ANTE_UP_SESSION_TOKEN") === null){

        _farItems =[
            {
                key: 'darkMode',
                text:'Dark Mode',
                ariaLabel:'Dark Mode',
                iconOnly: true,
                cacheKey: 'myCacheKey', // changing this key will invalidate this item's cache
                iconProps: { iconName: 'Contrast' },
                onClick: setDarkTheme
            },
            {
                key: 'account',
                text: "Account" ,
                iconProps: { iconName: 'Contact' },
                onClick: handleAccount
            },
        ]
    }
    let backGroundColor = "#1e1f21";
    if(localStorage.getItem('darkMode') === 'false'){
        backGroundColor = "#ffffff"
    }

    return <div className={"Header"} style={{backgroundColor:backGroundColor}}>
                <CommandBar
                    className={"commandBar"}
                    items={_items}
                    farItems={_farItems}
                />
    </div>

}
const mapStateToProps = (state) => {
    return {
        accountInfo: getAccountInfo(state),
        api : getAPI(state)
    };
};
export default connect(mapStateToProps)(Header);