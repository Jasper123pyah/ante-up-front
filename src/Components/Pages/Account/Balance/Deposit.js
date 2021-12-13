import {PrimaryButton, TextField} from "@fluentui/react";
import React, {useState} from "react";
import {getAccountInfo, getAPI} from "../../../../Core/Global/global.selectors";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import Payment from "./Payment";

function Deposit(props) {

    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    let history = useHistory();

    const onChangeAmount = React.useCallback((event, newValue?) => {
            if (!newValue || newValue.length <= 5 && validateNumbers(newValue.slice(-1))) {
                setAmount(newValue || '');
                setError('');
            }
        }, [],
    );
    const validateNumbers = (value) => {
        const re = /[0-9]/;
        return re.test(value);
    }

    function calculcateFees() {
        let threePercent = amount * 0.03 + 0.30;
        return Math.ceil((threePercent) * 100) / 100;
    }

    function calculateTotal() {
        let total = parseInt(amount) + calculcateFees();
        return isNaN(parseFloat(total)) ? "0" : total;
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
        <div style={{minHeight: '75vh', width: "20%"}}>
            <div style={{fontSize: 'xxx-large'}}>Deposit</div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div style={{fontStyle: 'xx-large'}}>Current Balance</div>
                <div>{props.accountInfo.balance}$</div>
            </div>
            <TextField value={amount} onChange={onChangeAmount} placeholder={"Deposit Amount"}/>
            <div style={{fontSize: 'small', color: 'grey'}}>$5.00 Minimum</div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div style={{fontStyle: 'xx-large'}}>Deposit amount</div>
                <div>{amount === '' ? "0" : amount}$</div>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div style={{fontStyle: 'xx-large'}}>Fees {amount === '' ? '' : ("(3% + 0.30$)")}</div>
                <div>{calculcateFees()}$</div>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div style={{fontStyle: 'xx-large'}}>Total</div>
                <div>{calculateTotal()}$</div>
            </div>
            <div style={{color:"#a4262c", height:'20px'}}>{error}</div>
            <PrimaryButton onClick={Continue} n text={"Continue"} style={{width: '100%'}}/>
        </div>
        <div  style={{ width: "40%"}}>
            <Payment total={calculateTotal()} amount={amount}/>
        </div>
    </div>
}

const mapStateToProps = (state) => {
    return {
        accountInfo: getAccountInfo(state)
    };
};

export default connect(mapStateToProps)(Deposit);