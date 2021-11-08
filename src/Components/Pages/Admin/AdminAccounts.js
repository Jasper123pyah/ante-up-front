import React, {useEffect, useState} from "react";
import {getAPI} from "../../../Core/Global/global.selectors";
import {connect} from "react-redux";

function AdminAccounts(props){

    const[accounts, setAccounts] = useState([]);
    useEffect(() => {
        getAllAccounts();
    },[props.api]);

    function getAllAccounts(){
        if(props.api !== undefined){
            props.api.get('/admin/accounts').then(res => {
                setAccounts(res.data);
            })
        }
    }
    return<div>
        {accounts.map(account => <div>
                {account.username} - {account.email}
            </div>
        )}
    </div>
}
const mapStateToProps = (state) => {
    return {
        api : getAPI(state)
    };
};

export default connect(mapStateToProps)(AdminAccounts);