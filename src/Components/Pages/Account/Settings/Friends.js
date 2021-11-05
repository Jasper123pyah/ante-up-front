import React, {useEffect, useState} from "react";
import {getAPI, getGlobalConnection} from "../../../../Core/Global/global.selectors";
import {connect} from "react-redux";
import {DetailsList, DetailsListLayoutMode, IconButton,  SelectionMode, TextField} from "@fluentui/react";
import {Col, Row} from "react-grid-system";
import FriendChatBox from "../../../Chat/FriendChatBox";
import FriendRequestList from "./FriendRequests";

function Friends(props){
    const [friends, setFriends] = useState([]);
    const [chatName, setChatName] = useState("");


    useEffect(() => {
        getFriends();
    },[props.api]);


    const [friendColumns, setFriendColumns] = useState([
        {
            key: 'nameColumn',
            name: 'Sort by Name',
            fieldName: 'name',
            minWidth: 150,
            maxWidth: 800,
            isRowHeader: true,
            isSorted: true,
            isSortedDescending: false,
            sortAscendingAriaLabel: 'Sorted A to Z',
            sortDescendingAriaLabel: 'Sorted Z to A',
            onColumnClick: _onColumnClick,
            data: 'string',
            onRender: (item) => {
                return <div style={{textAlign: "left", fontSize:"14px"}}>
                    {item}
                </div>;
            },
        },
    ]);

    function _onColumnClick(e, column){

        let newColumns = friendColumns.slice();
        let currColumn = newColumns.filter(currCol => column.key === currCol.key)[0];
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
        let newFriends = _copyAndSort(friends, currColumn.fieldName, currColumn.isSortedDescending);
        setFriendColumns(newColumns);
        setFriends(newFriends);

    }

    function _copyAndSort(items, columnKey, isSortedDescending?) {
        const key = columnKey;
        return items.slice(0).sort((a, b) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
    }

    function _onItemInvoked(item) {
        setChatName(item);
    }

    function _getKey(item, index){
        return item.key;
    }

    function getFriends(){
        let token = localStorage.getItem("ANTE_UP_SESSION_TOKEN");
        if(props.api !== undefined) {
            props.api.get("account/friends/"+token).then(res => {
                setFriends(res.data);
            })
        }
    }

    return<div>
        <div style={{fontSize:"20px"}}>Friends</div>
        <Row>
            <Col md={4} lg={4}>
                <DetailsList
                    items={friends}
                    columns={friendColumns}
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
                <FriendRequestList/>
            </Col>
            <Col md={8} lg={8}>
                {chatName !== "" ? <FriendChatBox name={chatName}/> : null}
            </Col>
        </Row>
    </div>
}

const mapStateToProps = (state) => {
    return {
        connection : getGlobalConnection(state),
        api : getAPI(state)
    };
};

export default connect(mapStateToProps)(Friends);
