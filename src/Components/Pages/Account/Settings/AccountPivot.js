import * as React from 'react';
import {Pivot, PivotItem, Separator} from '@fluentui/react';
import Account from "./Account";
import Balance from "./Balance";

function AccountPivot(props){
    return (
        <Pivot aria-label="Basic Pivot Example">
            <PivotItem headerText="Profile">
                <div className={"pivotContent"}>
                    <Separator/>
                    <Account/>
                </div>
            </PivotItem>
            <PivotItem headerText="Balance">
                <div className={"pivotContent"}>
                    <Separator/>
                    <Balance/>
                </div>
            </PivotItem>
            <PivotItem headerText="Friends">
                <div className={"pivotContent"}>
                    <Separator/>
                    <div>You have none lmao</div>
                </div>
            </PivotItem>
        </Pivot>
    );
};

export default AccountPivot;
