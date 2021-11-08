import React, {useEffect, useState} from "react";
import {getAPI} from "../../../Core/Global/global.selectors";
import {connect} from "react-redux";

function AdminGames(props){
    const[games, setGames] = useState([]);

    useEffect(() => {
        getAllGames();
    },[props.api]);

    function getAllGames(){
        if(props.api !== undefined){
            props.api.get('/Game').then(res => {
                console.log(res.data)
                setGames(res.data);
            })
        }
    }

    return<div>
        {games.map(game => <div>
                {game.name} - {game.image}
            </div>
        )}
    </div>
}
const mapStateToProps = (state) => {
    return {
        api : getAPI(state)
    };
};

export default connect(mapStateToProps)(AdminGames);