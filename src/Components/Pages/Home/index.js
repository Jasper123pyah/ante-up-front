import React from 'react';
import {connect} from "react-redux";
import GameList from "./GameList";
import "../../../App.css"
import HomeTop from "./HomeTop";

class Home extends React.Component{

    render() {
        return <div>
                <HomeTop/>
                <GameList/>
            </div>
        ;
    }
}

const mapStateToProps = (state) => {
    return {
    };
};
export default  connect(mapStateToProps) (Home);

