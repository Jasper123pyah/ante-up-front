import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import { CommandBar } from '@fluentui/react/lib/CommandBar';
import {getAccountInfo, getAPI} from "../../Core/Global/global.selectors";
import "../../App.css"
import Logo from "./Logo";
import {initializeIcons} from "@fluentui/font-icons-mdl2";
import {useHistory} from "react-router-dom";
import {setAccountInfo, setWagerModalOpen} from "../../Core/Global/global.actions";
import CenteredLoader from "./CenteredLoader";
import WagerModal from "../Pages/Game/Create Wager/WagerModal";

initializeIcons();

function Header(props) {
    let history = useHistory();
    const[loading, setLoading] = useState(false);
    const[showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (props.api !== undefined && localStorage.getItem("ANTE_UP_SESSION_TOKEN") !== null && localStorage.getItem("ANTE_UP_SESSION_TOKEN") !== undefined ) {
            setLoading(true);
            props.api.get('account/info').then(res => {
                let resInfo = {id: res.data.id, username: res.data.username, balance: res.data.balance};
                props.dispatch(setAccountInfo(resInfo))
                setLoading(false);
            })
        }
    }, [props.api, localStorage]);

    function handleAccount() {
        if (localStorage.getItem("ANTE_UP_SESSION_TOKEN") !== null) {
            history.push("/account");
        } else {
            history.push("/login");
        }
    }

    let _items = [
        {
            key: "Home",
            onRender: () => <Logo/>
        }
    ]

    let _farItems = [
        {
            key: 'Wager',
            text: "Wager",
            iconProps: { iconName: 'Add' },
            onClick: changeShowModal
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
                key: 'account',
                text: "Account" ,
                iconProps: { iconName: 'Contact' },
                onClick: handleAccount
            },
        ]
    }
    function changeShowModal(){
        showModal ? setShowModal(false) : setShowModal(true);
    }
    return<div>
        <WagerModal show={showModal} setShowModal={changeShowModal}/>
        <div className={"Header"} style={{backgroundColor:"#1e1f21"}}>
            <CommandBar
                className={"commandBar"}
                items={_items}
                farItems={_farItems}
            />
            {loading ? <CenteredLoader/> : <div></div>}
        </div>
    </div>
}
const mapStateToProps = (state) => {
    return {
        accountInfo: getAccountInfo(state),
        api : getAPI(state)
    };
};
export default connect(mapStateToProps)(Header);