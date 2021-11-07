import './App.css';
import React, {useEffect} from "react";
import Header from "./Components/Shared/Header";
import { setRTL } from '@fluentui/react/lib/Utilities';
import { ThemeProvider} from '@fluentui/react';
import {darkTheme, lightTheme} from "./themes";
import {connect} from "react-redux";
import { setConfiguration } from 'react-grid-system';
import Router from "./Components/Router";
import {setAPI, setConnection, setGames, setWagerAPI} from "./Core/Global/global.actions";
import {getAPI, getGlobalConnection,} from "./Core/Global/global.selectors";
import {HttpTransportType, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import Friends from "./Components/Shared/Friends/Friends";

setConfiguration({ maxScreenClass: 'xl' });
setRTL(true);

const axios = require('axios');
const api = axios.create({
    baseURL:'http://localhost:5000/',
    timeout: 10000
});

const wagerApi = axios.create({
    baseURL: 'http://localhost:6000/',
    timeout: 10000
})
// http://localhost:5000/
// http://78.47.219.206:420/

function App (props){

    async function buildConnection(connection){
        try{
            await connection.start();
            props.dispatch(setConnection(connection));

            if(localStorage.getItem('ANTE_UP_SESSION_TOKEN') !== undefined)
            {
                let token = localStorage.getItem('ANTE_UP_SESSION_TOKEN');
                await connection.invoke("Login", token);
            }
        }catch{
            console.log("Connection Failed")
        }
    }

    useEffect(() => {
        if(localStorage.getItem('ANTE_UP_SESSION_TOKEN') !== null && props.connection === undefined){
            let connection = new HubConnectionBuilder()
                .withUrl("https://localhost:5001/antehub", {
                    skipNegotiation: true,
                    transport: HttpTransportType.WebSockets
                })
                .configureLogging(LogLevel.Information)
                .withAutomaticReconnect()
                .build();
            buildConnection(connection);
        }
        props.dispatch(setAPI(api));
        props.dispatch(setWagerAPI(wagerApi));

        if(localStorage.getItem('darkMode') === undefined){
            localStorage.setItem('darkMode', "true")
        }
    },[]);

    return <div style={{overflowX:"hidden"}}>
        <ThemeProvider applyTo={"body"} theme={localStorage.getItem('darkMode') === 'true' ? darkTheme : lightTheme}>
            <Header/>
            <Router/>
            <Friends/>
        </ThemeProvider>
    </div>
}

const mapStateToProps = (state) => {
    return {
        api : getAPI(state),
        connection : getGlobalConnection(state)
    };
};

export default connect(mapStateToProps)(App);