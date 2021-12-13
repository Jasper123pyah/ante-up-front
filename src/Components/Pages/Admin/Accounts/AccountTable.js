import React, {useEffect, useState} from "react";
import {DetailsList, DetailsListLayoutMode, SelectionMode, TextField} from "@fluentui/react";
import {Col, Row} from "react-grid-system";
import {connect} from "react-redux";
import {getAPI} from "../../../../Core/Global/global.selectors";

function AccountTable(props) {
    const [accounts, setAccounts] = useState(props.accounts);
    const [items, setItems] = useState(accounts);

    useEffect(() => {
        if (props.api !== undefined) {

        }
    }, [props.api]);

    const [columns, setColumns] = useState([
        {
            key: 'nameColumn',
            name: 'Name',
            fieldName: 'name',
            minWidth: 100,
            maxWidth: 200,
            data: 'string',
            isRowHeader: true,
            onRender: (item) => {
                return <div style={{textAlign: "left"}}>{item.username}</div>;
            },
        },
        {
            key: 'emailColumn',
            name: 'Email',
            fieldName: 'email',
            minWidth: 150,
            maxWidth: 300,
            data: 'string',
            isRowHeader: true,
            onRender: (item) => {
                return <div style={{textAlign: "left"}}>{item.email}</div>;
            },
        },
        {
            key: 'wagerColumn',
            name: 'Wager',
            fieldName: 'wager',
            minWidth: 50,
            maxWidth: 1000,
            isRowHeader: true,
            data: 'string',
            onRender: (item) => {
                return <div style={{textAlign: "left"}}>{item.wager === null ? "No Wager" : item.wager.title}</div>;
            },
        },
        {
            key: 'balanceColumn',
            name: 'Balance',
            fieldName: 'balance',
            minWidth: 100,
            maxWidth: 120,
            isRowHeader: true,
            data: 'string',
            onRender: (item) => {
                return <div style={{textAlign: "left"}}>${item.balance}</div>;
            },
        },
    ])

    function _onItemInvoked(item) {
        console.log(item.username)
    };

    function _getKey(item, index): string {
        return item.key;
    };

    function _onChangeText(e, text) {
        setItems(text ? accounts.filter(i => i.username.toLowerCase().indexOf(text) > -1) : accounts);
    };

    return <div>
        <Row>
            <Col md={4} lg={4}>
                <TextField label="Filter by name" onChange={_onChangeText}/>
            </Col>
        </Row>
        <div style={{width:'100%', minHeight:'30vw', marginBottom:'5vw'}}>
            <DetailsList
                items={items}
                columns={columns}
                selectionMode={SelectionMode.none}
                getKey={_getKey}
                setKey="none"
                layoutMode={DetailsListLayoutMode.justified}
                isHeaderVisible={true}
                onItemInvoked={_onItemInvoked}
                styles={{
                    root: {
                        textAlign: "left",
                        selectors: {
                            ':hover': {
                                cursor: "pointer"
                            }
                        }
                    }
                }}
            />
        </div>
    </div>
}

const mapStateToProps = (state) => {
    return {
        api: getAPI(state)
    };
};
export default connect(mapStateToProps)(AccountTable);
