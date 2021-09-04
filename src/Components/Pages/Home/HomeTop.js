import {Dropdown, SearchBox, IDropdownOption} from "@fluentui/react";
import React from "react";

class HomeTop extends React.Component{

    options: IDropdownOption[] = [
        { key: 'lowhigh', text: 'Low to High' },
        { key: 'highlow', text: 'High to Low' },
    ];
    render() {
        return <div>
            <div style={{fontSize:"40px"}}>Browse</div>
            <div style={{marginBottom:"15px"}}>
                <div style={{fontSize:"18px", marginRight:"7px"}}>Filter by</div>
                <SearchBox  placeholder={"Search Categories"}/>
                <div style={{fontSize:"18px", marginRight:"7px"}}>Sort by</div>
                <Dropdown options={this.options}/>
            </div>
        </div>
    }
}
export default HomeTop;