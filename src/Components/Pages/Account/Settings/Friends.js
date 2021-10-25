import React, {useEffect, useState} from "react";
import { getAPI} from "../../../../Core/Global/global.selectors";
import {connect} from "react-redux";

function Friends(){
    const [accountInfo, setAccountInfo] = useState({});

    useEffect(() => {
    },[]);

    return<div>
    </div>
}

const mapStateToProps = (state) => {
    return {
        api : getAPI(state)
    };
};

export default connect(mapStateToProps)(Friends);
