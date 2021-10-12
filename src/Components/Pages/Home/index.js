import React from 'react';
import {connect} from "react-redux";
import GameList from "./GameList";
import "../../../App.css"

class Home extends React.Component{

    render() {
        return <div>
                <GameList/>
            </div>
    }
}

const mapStateToProps = (state) => {
    return {
    };
};
export default  connect(mapStateToProps) (Home);

