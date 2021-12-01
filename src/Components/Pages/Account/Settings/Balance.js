import React from "react";
import './Account.css';
class Balance extends React.Component{
    render() {
        return <div>
            <div style={{fontSize:"20px"}}>Deposit</div>
            <div>Add money to your balance through PayPal.</div>
            <div className={"accountDisable"}>

            </div>
            <div style={{fontSize:"20px"}}>Withdraw</div>
            <div>Cash out your balance through PayPal.</div>
            <div className={"accountDisable"}>

            </div>
            <div style={{fontSize:"20px"}}>Transaction History</div>
            <div>See all your transactions.</div>
            <div className={"accountProfile"}>

            </div>
        </div>
    }
}

export default Balance;