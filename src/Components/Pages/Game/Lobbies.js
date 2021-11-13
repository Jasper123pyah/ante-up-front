import React, {useEffect, useState} from "react";
import {DetailsList, DetailsListLayoutMode, SelectionMode, TextField} from "@fluentui/react";
import {useHistory} from "react-router-dom";
import {Col, Row} from "react-grid-system";
import {getAPI} from "../../../Core/Global/global.selectors";
import {connect} from "react-redux";

function Lobbies(props){
    const gameName = props.gameName;

    const history = useHistory();
    const [lobbies, setLobbies] = useState([]);
    const [items, setItems] = useState(lobbies);
    useEffect(() => {
        if(props.api !== undefined) {
            props.api.get('/wager/game/' + gameName).then(res => {
                let lobbiestoAdd = [];
                res.data.map((wager) => {
                    let team1 = wager.team1 !== null ? wager.team1.players.length : 0;
                    let team2 = wager.team2 !== null ? wager.team2.players.length : 0;
                    let teamlength = team1 + team2;
                    lobbiestoAdd.push({
                        key: wager.id,
                        name: wager.title,
                        description: wager.description,
                        host: wager.hostName,
                        ante: "$"+wager.ante,
                        queue: teamlength + "/" + wager.playerCap
                    })
                });
                setLobbies(lobbiestoAdd);
                setItems(lobbiestoAdd);
            })
        }
    },[gameName, props.api]);
    const [columns, setColumns] = useState([
        {
            key: 'nameColumn',
            name: 'Name',
            fieldName: 'name',
            minWidth: 150,
            maxWidth: 200,
            isRowHeader: true,
            isSorted: true,
            isSortedDescending: false,
            sortAscendingAriaLabel: 'Sorted A to Z',
            sortDescendingAriaLabel: 'Sorted Z to A',
            onColumnClick: _onColumnClick,
            data: 'string',
            onRender: (item) => {
                return <div style={{textAlign: "left"}}>{item.name}</div>;
            },
        },
        {
            key: 'descriptionColumn',
            name: 'Description',
            fieldName: 'description',
            minWidth: 150,
            maxWidth: 450,
            isRowHeader: true,
            isSorted: true,
            isSortedDescending: false,
            sortAscendingAriaLabel: 'Sorted A to Z',
            sortDescendingAriaLabel: 'Sorted Z to A',
            onColumnClick: _onColumnClick,
            data: 'string',
            onRender: (item) => {
                return <div style={{textAlign: "left"}}>{item.description}</div>;
            },
        },
        {
            key: 'anteColumn',
            name: 'Ante',
            fieldName: 'ante',
            minWidth: 50,
            maxWidth: 70,
            isRowHeader: true,
            isSorted: true,
            isSortedDescending: false,
            sortAscendingAriaLabel: 'Sorted A to Z',
            sortDescendingAriaLabel: 'Sorted Z to A',
            onColumnClick: _onColumnClick,
            data: 'number',
            onRender: (item) => {
                return <div style={{textAlign: "left"}}>{item.ante}</div>;
            },
        },
        {
            key: 'hostColumn',
            name: 'Host',
            fieldName: 'host',
            minWidth: 50,
            maxWidth: 70,
            isRowHeader: true,
            isSorted: true,
            isSortedDescending: false,
            sortAscendingAriaLabel: 'Sorted A to Z',
            sortDescendingAriaLabel: 'Sorted Z to A',
            onColumnClick: _onColumnClick,
            data: 'string',
            onRender: (item) => {
                return <div style={{textAlign: "left"}}>{item.host}</div>;
            },
        },
        {
            key: 'queueColumn',
            name: 'Queue',
            fieldName: 'queue',
            minWidth: 60,
            maxWidth: 70,
            isSorted: true,
            isSortedDescending: false,
            sortAscendingAriaLabel: 'Sorted A to Z',
            sortDescendingAriaLabel: 'Sorted Z to A',
            onColumnClick: _onColumnClick,
            data: 'string',
            onRender: (item) => {
                return <div style={{textAlign: "left"}}>{item.queue}</div>;
            },
        },
    ]);
    function _onColumnClick(e, column){

        const newColumns = columns.slice();
        const currColumn = newColumns.filter(currCol => column.key === currCol.key)[0];
        newColumns.forEach((newCol) => {
            if (newCol === currColumn) {
                currColumn.isSortedDescending = !currColumn.isSortedDescending;
                currColumn.isSorted = true;
            }
            else {
                newCol.isSorted = false;
                newCol.isSortedDescending = true;
            }
        });
        const newLobbies = _copyAndSort(lobbies, currColumn.fieldName, currColumn.isSortedDescending);
        setColumns(newColumns);
        setItems(newLobbies)

    };
    function _copyAndSort(items, columnKey, isSortedDescending?) {
        const key = columnKey;
        return items.slice(0).sort((a, b) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
    };

    function _onItemInvoked(item) {
        history.push("/lobby/"+item.key)
    };

    function _getKey(item, index): string {
        return item.key;
    };

    function _onChangeText(e, text){
        setItems(text ? lobbies.filter(i => i.name.toLowerCase().indexOf(text) > -1) : lobbies);
    };

    return<div>
                <div style={{fontSize:"40px"}}>{gameName}</div>
                <Row>
                    <Col md={4} lg={4}>
                        <TextField label="Filter by name" onChange={_onChangeText} />
                    </Col>
                </Row>

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
                        root :{
                            textAlign:"left",
                            selectors: {
                                ':hover': {
                                    cursor: "pointer"
                                }
                            }
                        }

                    }}
                />
    </div>
}
const mapStateToProps = (state) => {
    return {
        api : getAPI(state)
    };
};
export default connect(mapStateToProps)(Lobbies);
