import './App.css';
import React, {useEffect} from "react";
import Header from "./Components/Shared/Header";
import { setRTL } from '@fluentui/react/lib/Utilities';
import { ThemeProvider} from '@fluentui/react';
import {darkTheme, lightTheme} from "./themes";
import {connect} from "react-redux";
import { getTheme} from "./Core/Global/global.selectors";
import { setConfiguration } from 'react-grid-system';
import Footer from "./Components/Shared/Footer";
import Router from "./Components/Router";
import {setAPI} from "./Core/Global/global.actions";

setConfiguration({ maxScreenClass: 'xl' });
setRTL(true);

const axios = require('axios');
const api = axios.create({
    baseURL:'http://localhost:5000/',
    timeout: 10000
});
// http://localhost:5000/
// http://78.47.219.206:420/

function App (props){

    useEffect(() => {
        props.dispatch(setAPI(api));
    });

    return <div style={{overflowX:"hidden"}}>
        <ThemeProvider applyTo={"body"} theme={props.theme ? darkTheme : lightTheme}>
            <Header className={"Header"}/>
            <Router/>
            <Footer/>
        </ThemeProvider>
    </div>
}

const mapStateToProps = (state) => {
    return {
        theme : getTheme(state)
    };
};

export default connect(mapStateToProps)(App);