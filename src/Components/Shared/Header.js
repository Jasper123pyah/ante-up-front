import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';
import {getAPI, getTheme} from "../../Core/Global/global.selectors";
import { setTheme,} from "../../Core/Global/global.actions";
import "../../App.css"
import Logo from "./Logo";
import {initializeIcons} from "@fluentui/font-icons-mdl2";
import {useHistory} from "react-router-dom";
import {useCookies} from "react-cookie";

initializeIcons();

function Header(props){
    const [cookies, setCookie] = useCookies(["ANTE_UP_SESSION_TOKEN"]);
    let history = useHistory();
    const [accountInfo, setAccountInfo] = useState({
        username: "Account",
        balance: 0
    });
    const axios = require('axios');
    const api = axios.create({
        baseURL:'http://localhost:5000/',
        timeout: 10000
    });
    useEffect(() => {
        if(api !== undefined) {
            api.get('account/info', {
                params: {
                    id: cookies.ANTE_UP_SESSION_TOKEN
                }
            }).then(res => {
                let resInfo = {username: res.data.username, balance: res.data.balance};
                setAccountInfo(resInfo);
            })
        }
    });
    function handleAccount() {
        if(cookies.ANTE_UP_SESSION_TOKEN !== undefined){
            history.push("/account");
        }
        else{
            history.push("/login");
        }
    }
    function handleBalance(){
        history.push("/balance")
    }

    function setDarkTheme(){
        let currentTheme = props.theme;
        let newTheme;
        !currentTheme ? newTheme = true : newTheme = false;
        props.dispatch(setTheme(newTheme));
    }

    let _items: ICommandBarItemProps[] =[
        {
            key:"Home",
            onRender: () => <Logo/>
        }
    ]
    let _farItems: ICommandBarItemProps[] = [
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
            key: 'accountBalance',
            text: "$" + accountInfo.balance.toString(),
            cacheKey: 'myCacheKey', // changing this key will invalidate this item's cache
            iconProps: { iconName: 'Add' },
            onClick: handleBalance
        },
        {
            key: 'account',
            text: accountInfo.username,
            iconProps: { iconName: 'Contact' },
            onClick: handleAccount
        },
    ];


    let backGroundColor = "#1e1f21";
    if(!props.theme){
        backGroundColor = "#ffffff"
    }

    return <div style={{backgroundColor:backGroundColor,  width:"100%", zIndex:1}}>
                <CommandBar
                    className={"commandBar"}
                    items={_items}
                    farItems={_farItems}
                />
                <hr className={"Divider"}/>
            </div>

}
const mapStateToProps = (state) => {
    return {
        theme : getTheme(state),
        api : getAPI(state)
    };
};
export default connect(mapStateToProps)(Header);