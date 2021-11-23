import './App.css';
import React, {useEffect} from "react";
import Header from "./Components/Shared/Header";
import { setRTL } from '@fluentui/react/lib/Utilities';
import { ThemeProvider} from '@fluentui/react';
import {darkTheme} from "./themes";
import {connect} from "react-redux";
import { setConfiguration } from 'react-grid-system';
import Router from "./Components/Router";
import {setAPI, setConnection, setWagerAPI} from "./Core/Global/global.actions";
import {getGlobalConnection,} from "./Core/Global/global.selectors";
import {HttpTransportType, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import Friends from "./Components/Shared/Friends";
import Footer from "./Components/Shared/Footer/Footer";
import GameList from "./Components/Pages/Home/GameList";

setConfiguration({ maxScreenClass: 'xl' });
setRTL(true);

const axios = require('axios');

if (localStorage.getItem('ANTE_UP_SESSION_TOKEN')) {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('ANTE_UP_SESSION_TOKEN');
} else {
    axios.defaults.headers.common['Authorization'] = null;
}

const api = axios.create({
    baseURL:'https://localhost:5001/',
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

    },[]);

    return <div style={{overflowX:"hidden"}}>
        <ThemeProvider applyTo={"body"} theme={darkTheme}>
            <Header/>
            <Router/>
            <Friends/>
            <Footer/>
        </ThemeProvider>
    </div>
}

const mapStateToProps = (state) => {
    return {
        connection : getGlobalConnection(state)
    };
};

export default connect(mapStateToProps)(App);