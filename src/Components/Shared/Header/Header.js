import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {CommandBar} from '@fluentui/react/lib/CommandBar';
import {getAccountInfo, getAPI, getGlobalConnection} from "../../../Core/Global/global.selectors";
import './Header.css';
import Logo from "../Logo";
import {initializeIcons} from "@fluentui/font-icons-mdl2";
import {useHistory} from "react-router-dom";
import {setAccountInfo} from "../../../Core/Global/global.actions";
import CenteredLoader from "../CenteredLoader";
import WagerModal from "../../Pages/Game/Create Wager/WagerModal";
import {useCookies} from "react-cookie";
import {ActionButton, CommandButton} from '@fluentui/react/lib/Button';

initializeIcons();

function Header(props) {
    let history = useHistory();
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['ANTE_UP_SESSION_TOKEN']);

    useEffect(() => {
        if (props.api !== undefined && cookies.ANTE_UP_SESSION_TOKEN !== undefined) {
            setLoading(true);
            props.api.get('account/info').then(res => {
                let resInfo = {
                    id: res.data.id,
                    username: res.data.username,
                    balance: res.data.balance,
                    email: res.data.email,
                    inWager: res.data.inWager
                };
                props.dispatch(setAccountInfo(resInfo))
                setLoading(false);
            })
        }
    }, [props.api, cookies]);

    function handleAccount() {
        if (cookies.ANTE_UP_SESSION_TOKEN !== undefined) {
            history.push("/account");
        } else {
            history.push("/login");
        }
    }

    function handleProfile() {
        history.push("/account/profile")
    }

    function handleSettings() {
        history.push("/account/settings")
    }

    function handleBalance() {
        history.push("/account/balance")
    }

    async function LogOut() {
            if (props.connection !== undefined) {
            let token = cookies.ANTE_UP_SESSION_TOKEN;
            await props.connection.invoke("Logout", token).then(() => {
                removeCookie('ANTE_UP_SESSION_TOKEN');
                history.push("/");
                window.location.reload();
            });

        } else {
            console.log('err')
            window.location.reload();
        }
    }

    function changeShowModal() {
        showModal ? setShowModal(false) : setShowModal(true);
    }

    let _items = [
        {
            key: "Home",
            onRender: () => <Logo/>
        },
        {
            key: "Support",
            onRender: () => <div onClick={handleSupport} className={'infoButton'}>Support</div>
        },
    ]
    const menuProps = {
        items: [
            {
                key: 'Profile',
                text: 'Profile',
                iconProps: {iconName: 'Contact'},
                onClick: handleProfile
            },
            {
                key: 'Balance',
                text: 'Balance',
                iconProps: {iconName: 'Money'},
                onClick: handleBalance
            },
            {
                key: 'Settings',
                text: 'Settings',
                iconProps: {iconName: 'Settings'},
                onClick: handleSettings
            },
            {
                key: 'Logout',
                text: 'Log Out',
                iconProps: {iconName: 'SignOut'},
                onClick: LogOut,
            },
        ],
    };

    let _farItems = [
        {
            key: 'Wager',
            text: 'Wager',
            onRender: () =>
                <ActionButton
                    iconProps={{iconName: 'Add'}}
                    onClick={changeShowModal}
                    className={'infoButton'}
                    style={{fontSize: 'large'}}
                >
                    Wager
                </ActionButton>
        },
        {
            key: 'Account',
            onRender: () =>
                <CommandButton
                    menuProps={menuProps}
                    style={{fontSize: 'large', border: '3px solid #39ff13'}}
                    className={'infoButton'}
                >
                   {"Account - " + props.accountInfo.balance.toString()}
                </CommandButton>,
        },
    ];
    if(window.innerWidth < 1000){
        _farItems = [
            {
                key: 'Account',
                onRender: () =>
                    <CommandButton
                        menuProps={menuProps}
                        style={{fontSize: 'large', border: '3px solid #39ff13'}}
                        className={'infoButton'}
                    >
                        {"Account - $" + props.accountInfo.balance.toString()}
                    </CommandButton>,
            },
        ];
        menuProps.items.push({
                key: 'Wager',
                text: 'Wager',
                iconProps: {iconName: 'Add'},
                onClick: changeShowModal,
            })
    }

    function handleSupport() {
        history.push("/support")
    }

    function handleRegister() {
        history.push("/register");
    }

    if (cookies.ANTE_UP_SESSION_TOKEN === undefined) {

        _farItems = [
            {
                key: 'LogIn',
                onRender: () => <div onClick={handleAccount} className={'logInButton'}>Log In</div>
            },
            {
                key: 'Register',
                onRender: () => <div onClick={handleRegister} className={'registerButton'}>Register</div>
            },
        ]
    }

    return <div >
        {cookies.ANTE_UP_SESSION_TOKEN !== undefined ?
            <WagerModal show={showModal} setShowModal={changeShowModal}/> : ''}
        <div className={"Header"}>
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
        api: getAPI(state),
        connection: getGlobalConnection(state)
    };
};
export default connect(mapStateToProps)(Header);