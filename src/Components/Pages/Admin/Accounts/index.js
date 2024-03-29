import React, {useEffect, useState} from "react";
import {getAPI} from "../../../../Core/Global/global.selectors";
import {connect} from "react-redux";
import CenteredLoader from "../../../Shared/CenteredLoader";
import AccountTable from "./AccountTable";

function AdminAccounts(props){
    const[accounts, setAccounts] = useState([]);
    const[loading, setLoading] = useState(true);

    useEffect(() => {
        getAllAccounts();
    },[props.api]);

    function getAllAccounts(){
        if(props.api !== undefined){
            setLoading(true);
            props.api.get('/admin/accounts').then(res => {
                setAccounts(res.data);
                setLoading(false);
            })
        }
    }
    return<div>
        {loading ? <CenteredLoader/> : <div style={{marginTop:'1vw'}}>
            <AccountTable accounts={accounts}/>
        </div>}
    </div>
}
const mapStateToProps = (state) => {
    return {
        api : getAPI(state)
    };
};

export default connect(mapStateToProps)(AdminAccounts);