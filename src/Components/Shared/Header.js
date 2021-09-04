import React from "react";
import {connect} from "react-redux";
import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';
import {getTheme} from "../../Core/Global/global.selectors";
import {setTheme} from "../../Core/Global/global.actions";
import "../../App.css"
import Logo from "./Logo";
import {initializeIcons} from "@fluentui/font-icons-mdl2";

initializeIcons();
class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }
    _items: ICommandBarItemProps[] =[
        {
            key:"Home",
            onRender: () => <Logo/>
        }
    ]
    _farItems: ICommandBarItemProps[] = [
        {
            key: 'darkMode',
            text:'Dark Mode',
            ariaLabel:'Dark Mode',
            iconOnly: true,
            cacheKey: 'myCacheKey', // changing this key will invalidate this item's cache
            iconProps: { iconName: 'Contrast' },
            onClick: () => this.setDarkTheme()
        },
        {
            key: 'accountBalance',
            text: '35$',
            cacheKey: 'myCacheKey', // changing this key will invalidate this item's cache
            iconProps: { iconName: 'Add' },
            onClick: () => console.log('Money')
        },
        {
            key: 'account',
            text: 'Account',
            iconProps: { iconName: 'Contact' },
            onClick: () => console.log('Account'),
        },
    ];

    setDarkTheme() {
        let currentTheme = this.props.theme;
        let newTheme;
        !currentTheme ? newTheme = true : newTheme = false;
        this.props.dispatch(setTheme(newTheme));
    }

    render() {
        let backGroundColor = "#1e1f21";
        if(!this.props.theme){
            backGroundColor = "#ffffff"
        }
        return (
            <div style={{background: backGroundColor,position:"fixed", width:"100%",zIndex:1}}>
                <CommandBar
                    className={"commandBar"}
                    items={this._items}
                    farItems={this._farItems}
                />
                <hr className={"Divider"}/>
            </div>
        );
    }

}
const mapStateToProps = (state) => {
    return {
        theme : getTheme(state)
    };
};
export default connect(mapStateToProps)(Header);



