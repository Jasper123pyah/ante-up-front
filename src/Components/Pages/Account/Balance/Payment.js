import PaymentButton from "./PaymentButton";

function Payment(props) {

    return <div style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
        <div style={{fontSize:'xx-large'}}>Your total is ${props.amount}</div>
        <PaymentButton amount={props.amount} />
    </div>
}

export default Payment;