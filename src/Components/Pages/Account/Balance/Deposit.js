import {PrimaryButton, TextField} from "@fluentui/react";
import React, {useState} from "react";
import {getAccountInfo, getAPI} from "../../../../Core/Global/global.selectors";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import Payment from "./Payment";
import {Col, Row} from "react-grid-system";
import DepositButtons from "./DepositButtons";

function Deposit(props) {

    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    let history = useHistory();


    function ChangeAmount(newAmount){
        setAmount(newAmount);
    }

    function ConvertToK(number){
        if(number >= 1000){
            return number/1000 + "k";
        } else {
            return number.toString();
        }
    }

    function calculateTotal() {
        let total = parseInt(amount) * 100;
        return ConvertToK(isNaN(parseFloat(total)) ? props.accountInfo.balance : props.accountInfo.balance + total);
    }

    function Continue() {
        if (amount === '') {
            setError('Fill in an amount')
        } else if (parseInt(amount) < 5) {
            setError('Amount must be higher than 5$')
        } else {
            history.push('');
        }
    }

    return <div style={{display:'flex'}}>
        <div style={{minHeight: '75vh', width: '40%'}}>
            <div style={{fontSize: 'xxx-large'}}>Deposit</div>

            <div>
                <DepositButtons convertToK={ConvertToK} changeAmount={ChangeAmount}/>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div style={{fontStyle: 'xx-large'}}>Current Credits</div>
                <div>{ConvertToK(props.accountInfo.balance)} Credits</div>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div style={{fontStyle: 'xx-large'}}>Deposit amount</div>
                <div>{amount === '' ? "0" : amount}$</div>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div style={{fontStyle: 'xx-large'}}>New Total</div>
                <div>{calculateTotal()} Credits</div>
            </div>
            <div style={{color:"#a4262c", height:'20px'}}>{error}</div>
            <PrimaryButton onClick={Continue} text={"Continue"} style={{width: '100%'}}/>
        </div>
    </div>
}

const mapStateToProps = (state) => {
    return {
        accountInfo: getAccountInfo(state)
    };
};

export default connect(mapStateToProps)(Deposit);