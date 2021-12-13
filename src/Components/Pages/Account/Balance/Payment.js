import PaymentButton from "./PaymentButton";

function Payment(props) {

    return <div style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
        <div style={{fontSize:'xx-large'}}>Your total is ${props.total}</div>
        <PaymentButton total={props.total} amount={props.amount} />
    </div>
}

export default Payment;