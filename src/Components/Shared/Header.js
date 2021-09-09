import React from "react";
import {connect} from "react-redux";
import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';
import {getTheme} from "../../Core/Global/global.selectors";
import {setTheme} from "../../Core/Global/global.actions";
import "../../App.css"
import Logo from "./Logo";
import {initializeIcons} from "@fluentui/font-icons-mdl2";
import { useHistory } from "react-router-dom";

initializeIcons();

function Header(props){

    let history = useHistory();

    function handleAccount() {
        history.push("/login");
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
            text: '35$',
            cacheKey: 'myCacheKey', // changing this key will invalidate this item's cache
            iconProps: { iconName: 'Add' },
            onClick: handleBalance
        },
        {
            key: 'account',
            text: 'Account',
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
        theme : getTheme(state)
    };
};
export default connect(mapStateToProps)(Header);