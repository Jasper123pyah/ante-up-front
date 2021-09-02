import './App.css';
import React from "react";
import Home from "./Components/Home";
import Header from "./Components/Shared/Header";
import { setRTL } from '@fluentui/react/lib/Utilities';
import {PrimaryButton, ThemeProvider, Toggle} from '@fluentui/react';
import {darkTheme, lightTheme} from "./themes";
import {connect} from "react-redux";
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import {getTheme} from "./Core/Global/global.selectors";
import { setConfiguration } from 'react-grid-system';
import { Container, Row, Col } from 'react-grid-system';

setConfiguration({ maxScreenClass: 'xl' });
setRTL(true);
initializeIcons();

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
    render(){
        return <div>
            <ThemeProvider applyTo={"body"} theme={this.props.theme ? darkTheme : lightTheme}>
                <Header className={"Header"}/>
                <Container>
                    <Row>
                        <Col sm={12} md={2} lg={1}>

                        </Col>
                        <Col sm={12} md={10} lg={10}>
                            <Home/>
                        </Col>
                        <Col sm={12} md={12} lg={1}>
                            <PrimaryButton onClick={this.getTestData()}>GetTestData</PrimaryButton>
                        </Col>
                    </Row>
                </Container>
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