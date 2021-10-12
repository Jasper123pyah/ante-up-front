import './App.css';
import React, {useEffect} from "react";
import Header from "./Components/Shared/Header";
import { setRTL } from '@fluentui/react/lib/Utilities';
import { ThemeProvider} from '@fluentui/react';
import {darkTheme, lightTheme} from "./themes";
import {connect} from "react-redux";
import { setConfiguration } from 'react-grid-system';
import Router from "./Components/Router";
import {setAPI, setConnection} from "./Core/Global/global.actions";
import {getAPI, getGlobalState} from "./Core/Global/global.selectors";
import {HttpTransportType, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";

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
        const connection = new HubConnectionBuilder()
            .withUrl("https://localhost:6001/antehub", {
                skipNegotiation: true,
                transport: HttpTransportType.WebSockets
            })
            .configureLogging(LogLevel.Information)
            .withAutomaticReconnect()
            .build();
        connection.start().then(r => props.dispatch(setConnection(connection)));

        props.dispatch(setAPI(api));
        if(localStorage.getItem('darkMode') === undefined){
            localStorage.setItem('darkMode', "true")
        }
    },[]);

    return <div style={{overflowX:"hidden"}}>
        <ThemeProvider applyTo={"body"} theme={localStorage.getItem('darkMode') === 'true' ? darkTheme : lightTheme}>
            <Header/>
            <Router/>
        </ThemeProvider>
    </div>
}

const mapStateToProps = (state) => {
    return {
        api : getAPI(state),
        connection : getGlobalState(state)
    };
};

export default connect(mapStateToProps)(App);