import React from "react";
import "./Balance.css"
import PaymentButton from "./PaymentButton";

function Balance(){
    return <div>
        <div style={{fontSize: "20px"}}>Deposit</div>
        <div>Add money to your balance through PayPal.</div>
        <div className={"balanceBox"}>
        </div>
        <div style={{fontSize: "20px"}}>Withdraw</div>
        <div>Cash out your balance through PayPal.</div>
        <div className={"balanceBox"}>
        </div>
        <div style={{fontSize: "20px"}}>Transaction History</div>
        <div>See all your transactions.</div>
        <div >
        </div>
    </div>
}

export default Balance;