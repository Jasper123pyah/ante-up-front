import './App.css';
import React from "react";
import Home from "./Components/Pages/Home";
import Header from "./Components/Shared/Header";
import { setRTL } from '@fluentui/react/lib/Utilities';
import {PrimaryButton, ThemeProvider} from '@fluentui/react';
import {darkTheme, lightTheme} from "./themes";
import {connect} from "react-redux";
import {getTheme} from "./Core/Global/global.selectors";
import { setConfiguration } from 'react-grid-system';
import { Row, Col } from 'react-grid-system';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./Components/Shared/Footer";

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
                    <div style={{paddingTop:"80px"}}>
                        <Row>
                            <Col sm={12} md={1} lg={1}>
                            </Col>
                            <Col sm={12} md={10} lg={10}>
                                <Home/>
                            </Col>
                            <Col sm={12} md={1} lg={1}>
                            </Col>
                        </Row>
                    </div>
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