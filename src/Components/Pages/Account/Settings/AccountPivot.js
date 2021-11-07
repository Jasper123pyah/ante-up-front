import * as React from 'react';
import {Pivot, PivotItem} from '@fluentui/react';
import Settings from "./Settings.js";
import Balance from "./Balance";
import Profile from "./Profile";

function AccountPivot(props){
    return (
        <Pivot>
            <PivotItem headerText="Profile">
                <div className={"pivotContent"}>
                    <Profile/>
                </div>
            </PivotItem>
            <PivotItem headerText="Balance">
                <div className={"pivotContent"}>
                    <Balance/>
                </div>
            </PivotItem>
            <PivotItem headerText="Settings">
                <div className={"pivotContent"}>
                    <Settings/>
                </div>
            </PivotItem>
        </Pivot>
    );
};

export default AccountPivot;
