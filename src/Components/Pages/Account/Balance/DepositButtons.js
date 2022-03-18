import React, {useState} from "react";
import {Col, Row} from "react-grid-system";
import {TextField} from "@fluentui/react";

function DepositButtons(props) {

    const amounts = [
        10, 50, 100, 250, 500, 1000
    ];
    const [value, setValue] = useState('');

    function getCredits(amount){
        let creditAmount = amount * 100;
        return props.convertToK(creditAmount);
    }


    function OnClick(amount){
        setValue('');
        props.changeAmount(amount);
    }
    const validateNumbers = (value) => {
        const re = /[0-9]/;
        return re.test(value);
    }
    const onChangeCustom = React.useCallback((event, newValue?) => {
            console.log(newValue)
            if (!newValue || newValue.length <= 5 && validateNumbers(newValue.slice(-1))) {
                setValue(newValue);
                props.changeAmount(newValue);
            }
        }, [],
    );
    return <div>
        <Row style={{marginBottom: '10px'}}>
            {amounts.map(amount => <Col lg={4}>
                    <div className={'priceButton'}>
                        <div onClick={() => OnClick(amount)}>
                            {getCredits(amount)} Credits
                            <br/>
                            {amount}$
                        </div>
                    </div>
                </Col>)}
            <Col lg={12}>
                    Custom amount:
                    <TextField value={value} onChange={onChangeCustom}/>
            </Col>
        </Row>
    </div>
}

export default DepositButtons;
