import React, {useEffect, useState} from "react";
import {DetailsList, DetailsListLayoutMode, PrimaryButton, SelectionMode, TextField} from "@fluentui/react";
import {useHistory} from "react-router-dom";
import {Col, Row} from "react-grid-system";
import {getAPI} from "../../../Core/Global/global.selectors";
import {connect} from "react-redux";

function Lobbies(props) {
    const gameName = props.gameName;

    const history = useHistory();
    const [lobbies, setLobbies] = useState([]);
    const [items, setItems] = useState(lobbies);
    useEffect(() => {
        if (props.api !== undefined) {
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
                        ante: "$" + wager.ante,
                        queue: teamlength + "/" + wager.playerCap
                    })
                });
                setLobbies(lobbiestoAdd);
                setItems(lobbiestoAdd);
            })
        }
    }, [gameName, props.api]);

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
                return <div style={{textAlign: "left", fontSize:'large'}}>{item.name}</div>;
            },
        },
        {
            key: 'descriptionColumn',
            name: 'Description',
            fieldName: 'description',
            minWidth: 150,
            maxWidth: 1000,
            isRowHeader: true,
            isSorted: true,
            isSortedDescending: false,
            sortAscendingAriaLabel: 'Sorted A to Z',
            sortDescendingAriaLabel: 'Sorted Z to A',
            onColumnClick: _onColumnClick,
            data: 'string',
            onRender: (item) => {
                return <div style={{textAlign: "left", fontSize:'large'}}>{item.description}</div>;
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
                return <div style={{textAlign: "left", fontSize:'large'}}>{item.ante}</div>;
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
                return <div style={{textAlign: "left", fontSize:'large'}}>{item.host}</div>;
            },
        },
        {
            key: 'queueColumn',
            name: 'Queue',
            fieldName: 'queue',
            minWidth: 60,
            maxWidth: 70,
            isSorted: true,
            isRowHeader: true,
            isSortedDescending: false,
            sortAscendingAriaLabel: 'Sorted A to Z',
            sortDescendingAriaLabel: 'Sorted Z to A',
            onColumnClick: _onColumnClick,
            data: 'string',
            onRender: (item) => {
                return <div style={{textAlign: "left",fontSize:'large'}}>{item.queue}</div>;
            },
        },
        {
            key: 'joinColumn',
            minWidth: 90,
            maxWidth: 100,
            data: 'string',
            onRender: (item) => {
                return <PrimaryButton onClick={() =>
                    history.push("/lobby/" + item.key)}>Join</PrimaryButton>;
            },
        },
    ]);

    function _onColumnClick(e, column) {

        const newColumns = columns.slice();
        const currColumn = newColumns.filter(currCol => column.key === currCol.key)[0];
        newColumns.forEach((newCol) => {
            if (newCol === currColumn) {
                currColumn.isSortedDescending = !currColumn.isSortedDescending;
                currColumn.isSorted = true;
            } else {
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


    function _getKey(item, index): string {
        return item.key;
    };

    function _onChangeText(e, text) {
        setItems(text ? lobbies.filter(i => i.name.toLowerCase().indexOf(text) > -1) : lobbies);
    };

    return <div>
        <div style={{fontSize: "xxx-large"}}>{gameName}</div>
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
export default connect(mapStateToProps)(Lobbies);
