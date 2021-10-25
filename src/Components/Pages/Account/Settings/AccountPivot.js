import * as React from 'react';
import {Pivot, PivotItem, Separator} from '@fluentui/react';
import Account from "./Account";
import Balance from "./Balance";
import Friends from "./Friends";
import Profile from "./Profile";

function AccountPivot(props){
    return (
        <Pivot aria-label="Basic Pivot Example">
            <PivotItem headerText="Profile">
                <div className={"pivotContent"}>
                    <Separator/>
                    <Profile/>
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
                    <Friends/>
                </div>
            </PivotItem>
            <PivotItem headerText="Settings">
                <div className={"pivotContent"}>
                    <Separator/>
                    <Account/>
                </div>
            </PivotItem>
        </Pivot>
    );
};

export default AccountPivot;
