import React, {useEffect, useState} from "react";
import "../../../../App.css"
import {getAPI, getGames} from "../../../../Core/Global/global.selectors";
import {connect} from "react-redux";
import {setGames} from "../../../../Core/Global/global.actions";
import CardSlider from "./Cards/CardSlider";
import CenteredLoaderFS from "../../../Shared/CenteredLoaderFS";

function WagerList(props){

    const [gameList, setGameList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(props.games.length !== 0){
            setGameList(props.games)
        }else{
            getGames();
        }
    },[props.api]);

    function getGames(){
        setLoading(true);
        if(props.api !== undefined){
            props.api.get('game').then(res => {
                props.dispatch(setGames(res.data))
                setGameList(res.data);
                setLoading(false);
            })
        }
    }

    return <div style={{marginLeft:'1vh', marginBottom:'4vh'}}>
        <div style={{fontSize:"40px"}}>Wagers</div>
        {loading ? <CenteredLoaderFS/>:
            <div>
                <CardSlider items={gameList}/>
            </div>}
    </div>
}
const mapStateToProps = (state) => {
    return {
        api: getAPI(state),
        games : getGames(state),
    };
};


export default connect(mapStateToProps)(WagerList);