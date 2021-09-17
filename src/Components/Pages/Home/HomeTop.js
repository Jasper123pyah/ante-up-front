import {Dropdown, SearchBox, IDropdownOption} from "@fluentui/react";
import React from "react";
import {initializeIcons} from "@fluentui/font-icons-mdl2";
import { Icon } from '@fluentui/react/lib/Icon';
import {Col, Row} from "react-grid-system";

initializeIcons();
class HomeTop extends React.Component{

    options: IDropdownOption[] = [

        { key: 'highlow', text: 'High to Low', data: { icon:'Down' } },
        { key: 'lowhigh', text: 'Low to High', data: { icon:'Up' } },
    ];
    onRenderOption = (option) => {
        return (
            <div>
                {option.data && option.data.icon && (
                    <Icon style={{ marginRight: '8px'}}
                          iconName={option.data.icon}
                          aria-hidden="true"
                          title={option.data.icon}
                    />
                )}
                <span>{option.text}</span>
            </div>
        );
    };

    render() {
        return <div style={{marginBottom:"20px"}}>
            <div style={{fontSize:"40px"}}>Browse</div>
            <Row>
                <Col sm={12} md={5} lg={3}>
                    <div style={{fontSize:"19px", marginRight:"7px", float:"left"}}>Filter by</div>
                    <SearchBox  placeholder={"Search Categories"}/>
                </Col>
                <Col/>
                <Col sm={12} md={4} lg={2}>
                    <div style={{fontSize:"19px", marginRight:"7px", float:"left"}}>Sort by</div>
                    <Dropdown options={this.options}
                              defaultSelectedKey={"highlow"}
                              onRenderOption={this.onRenderOption}
                              dropdownWidth={'auto'}
                              style={{float:"right"}}
                    />
                </Col>
            </Row>
        </div>
    }
}
export default HomeTop;