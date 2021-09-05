import './App.css';
import React from "react";
import Header from "./Components/Shared/Header";
import { setRTL } from '@fluentui/react/lib/Utilities';
import {PrimaryButton, ThemeProvider} from '@fluentui/react';
import {darkTheme, lightTheme} from "./themes";
import {connect} from "react-redux";
import {getTheme} from "./Core/Global/global.selectors";
import { setConfiguration } from 'react-grid-system';
import Footer from "./Components/Shared/Footer";
import Router from "./Components/Router";

setConfiguration({ maxScreenClass: 'xl' });
setRTL(true);

const axios = require('axios');
const api = axios.create({
    baseURL:'https://localhost:5001/',
    timeout: 10000
});

class App extends React.Component {
    getTestData(){
        api.get('game').then(res => {
            console.log(res.data)
        })
    }
    postNewGame() {
        api.post('game/add', {Name: "Fortnite", GamerCount: 1237, Image: "fortnite.jpg", CategoryTag: "Battle Royale"})
            .then(res => {
                console.log(res.data)
                this.getTestData()
            })
    }
    returnButton(){
        return <PrimaryButton onClick={this.getTestData()}>GetTestData</PrimaryButton>
    }
    render(){
        return <div style={{overflowX:"hidden"}}>
            <ThemeProvider applyTo={"body"} theme={this.props.theme ? darkTheme : lightTheme}>
                <Header className={"Header"}/>
                <Router/>
                <Footer/>
            </ThemeProvider>
        </div>
    }

}
const mapStateToProps = (state) => {
    return {
        theme : getTheme(state)
    };
};

export default connect(mapStateToProps)(App);