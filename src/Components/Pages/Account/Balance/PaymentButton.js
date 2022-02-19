import React from "react";
import ReactDOM from "react-dom";
import {getAPI} from "../../../../Core/Global/global.selectors";
import {connect} from "react-redux";

//const PayPalButton = window.paypal.Buttons.driver("react", {React, ReactDOM});

function PaymentButton(props) {

    function createOrder(data, actions) {
        return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
                {
                    description: "Ante-Up Balance",
                    amount: {
                        currency_code: "USD",
                        value: props.amount,
                    },
                },
            ],
        });
    }

    function onApprove(data, actions) {
        actions.order.capture().then(res => {
            if (res.status === "COMPLETED" || res.status === "APPROVED") {
                updateBalance(res.id)
            }
        });

    }

    function onError(data, actions) {
        let response = actions.order.capture();
        return actions.order.capture();
    }

    function updateBalance(id) {
        if(props.api !== undefined){
            props.api.post('balance/deposit/' + id).then(res => {
                window.location.reload();
            }).catch(err => console.log(err));
        }
    }

    /*
    <PayPalButton
        createOrder={(data, actions) => createOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)}
        onError={(data, actions) => onError(data, actions)}
    />
    */

    return (<div>


    </div>
    );
}

const mapStateToProps = (state) => {
    return {
        api: getAPI(state)
    };
};

export default connect(mapStateToProps)(PaymentButton);