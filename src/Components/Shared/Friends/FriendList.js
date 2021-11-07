import React, {useEffect, useState} from "react";
import {getAPI} from "../../../Core/Global/global.selectors";
import {connect} from "react-redux";
import {TextField} from "@fluentui/react";
import {PulseLoader} from "react-spinners";

function FriendList(props){
    const [friends, setFriends] = useState([]);
    const [items, setItems] = useState(friends);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getFriends();
    },[props.api]);

    async function getFriends(){
        let token = localStorage.getItem("ANTE_UP_SESSION_TOKEN");

        if(props.api !== undefined) {
            setLoading(true);
            let res  = await props.api.get("account/friends/"+token);
            setFriends(res.data);
            setItems(res.data);
            setLoading(false);
        }
    }
    function filterFriends(e, text){
        setItems(text ? friends.filter(i => i.toLowerCase().indexOf(text) > -1) : friends);
    };
    function openChat(friendName){
        props.setChat(friendName);
    }

    return<div>
        {loading ? <div style={{paddingLeft:"110px", paddingTop:"40px"}}>
            <PulseLoader color={"#39ff13"} size={20}/>
        </div> : friends.length === 0 ?
            <div style={{textAlign:"center"}}>"You have no friends, go to Friend Requests to add friends."</div> :
            <div>
                <div style={{height:"44px", marginTop:"10px", marginLeft:"10px"}}>
                    <TextField placeholder={"Filter friends by name..."}
                               onChange={filterFriends}
                    />
                </div>
                {items.map(item =>
                    <div onClick={() => openChat(item)} className={"friendItem"}>
                        {item}
                    </div>
                )}
            </div>}
    </div>
}

const mapStateToProps = (state) => {
    return {
        api : getAPI(state)
    };
};

export default connect(mapStateToProps)(FriendList);
