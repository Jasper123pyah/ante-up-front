import React from 'react';
import {connect} from "react-redux";
import GameList from "./GameList";
import "../../../App.css"
import Friends from "../../Shared/Friends";
import Footer from "../../Shared/Footer/Footer";
import {ThemeProvider} from "@fluentui/react";

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

