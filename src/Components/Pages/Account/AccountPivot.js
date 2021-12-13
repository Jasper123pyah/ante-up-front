import * as React from 'react';
import {useEffect, useState} from "react";
import {getAccountInfo} from "../../../Core/Global/global.selectors";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import Balance from "./Balance";
import Profile from "./Profile";
import Settings from "./Settings";
import "./Account.css"

function AccountPivot(props) {
    const [accountInfo, setAccountInfo] = useState({
        username: "",
        email: "",
    });
    let history = useHistory()
    useEffect(() => {
        if(props.accountInfo.username !== undefined){
            setAccountInfo(props.accountInfo)
        }
    }, [props.accountInfo]);

    function showPage() {
        if(accountInfo.username !== ''){
            if (props.pivot === 'profile') {
                return <Profile name={accountInfo.username}/>
            } else if (props.pivot === 'balance') {
                return <Balance/>
            } else if (props.pivot === 'settings') {
                return <Settings accountInfo={accountInfo}/>
            }
        }
    }

    return (<div>
            <div className={'pivotButtonContainer'}>
                <div onClick={() => history.push('/account/profile')} className={'pivotButton'}>
                    <div>
                        Profile
                        {props.pivot === 'profile' ? <div className={'pivotUnderLine'}/> : <div/>}
                    </div>
                </div>
                <div onClick={() => history.push('/account/balance')} className={'pivotButton'}>
                    <div>
                        Balance
                        {props.pivot === 'balance' ? <div className={'pivotUnderLine'}/> : <div/>}
                    </div>
                </div>
                <div onClick={() => history.push('/account/settings')} className={'pivotButton'}>
                    <div>
                        Settings
                        {props.pivot === 'settings' ? <div className={'pivotUnderLine'}/> : <div/>}
                    </div>
                </div>
            </div>
            {showPage()}
        </div>);
};

const mapStateToProps = (state) => {
    return {
        accountInfo: getAccountInfo(state)
    };
};

export default connect(mapStateToProps)(AccountPivot);
