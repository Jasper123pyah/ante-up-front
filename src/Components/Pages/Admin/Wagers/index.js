import React from "react";
import {getAPI} from "../../../../Core/Global/global.selectors";
import {connect} from "react-redux";

function AdminWagers(){

    return<div>
    </div>
}
const mapStateToProps = (state) => {
    return {
        api : getAPI(state)
    };
};

export default connect(mapStateToProps)(AdminWagers);