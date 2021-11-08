import React, {useEffect, useState} from "react";
import {Pivot, PivotItem} from "@fluentui/react";
import {Col, Row} from "react-grid-system";
import {getAPI} from "../../../Core/Global/global.selectors";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import {PulseLoader} from "react-spinners";
import AdminWagers from "./Wagers";
import AdminGames from "./Games";
import AdminAccounts from "./Accounts";

function Admin(props){

    const [loading, setLoading] = useState(true);
    let history = useHistory();

    useEffect(()=>{
        setLoading(true);
        if(props.api !== undefined){
            props.api.get('admin').then(res => {
                if(!res.data){
                    history.push("/");
                }else{
                    setLoading(false);
                }
            });
        }
    },[props.api]);

    return<div>
        {loading ? <div style={{position:"fixed", top:"45%", left:"45%", overflowX:"hidden"}}>
                <PulseLoader color={"#39ff13"} size={40}/>
            </div> :
        <Row>
            <Col/>
            <Col sm={12} md={10} lg={10}>
                <div style={{fontSize:"40px", marginLeft:"15px", marginBottom:"10px"}}>Admin Panel</div>
                <Pivot>
                    <PivotItem headerText={"Wagers"}>
                        <div className={"pivotContent"}>
                           <AdminWagers/>
                        </div>
                    </PivotItem>
                    <PivotItem headerText={"Games"}>
                        <div className={"pivotContent"}>
                            <AdminGames/>
                        </div>
                    </PivotItem>
                    <PivotItem headerText={"Accounts"}>
                        <div className={"pivotContent"}>
                            <AdminAccounts/>
                        </div>
                    </PivotItem>
                </Pivot>
            </Col>
            <Col/>
        </Row>}
    </div>
}
const mapStateToProps = (state) => {
    return {
        api: getAPI(state)
    };
};
export default connect(mapStateToProps)(Admin);