import './App.css';
import React, {useEffect} from "react";
import Header from "./Components/Shared/Header/Header";
import {setRTL} from '@fluentui/react/lib/Utilities';
import {ThemeProvider} from '@fluentui/react';
import {darkTheme} from "./themes";
import {connect} from "react-redux";
import {setConfiguration} from 'react-grid-system';
import Router from "./Components/Router";
import {setAPI, setConnection, setWagerAPI} from "./Core/Global/global.actions";
import {getGlobalConnection,} from "./Core/Global/global.selectors";
import {HttpTransportType, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import Friends from "./Components/Shared/Friends";
import {useCookies} from "react-cookie";
setConfiguration({maxScreenClass: 'xl'});
setRTL(true);


// https://localhost:5001/
// https://78.47.219.206:420/
// https://api.jaspervandenmeiracker.nl/

function App(props) {
    const [cookies] = useCookies(['ANTE_UP_SESSION_TOKEN']);
    const axios = require('axios');

    if (cookies.ANTE_UP_SESSION_TOKEN !== undefined) {
        axios.defaults.headers.common['Authorization'] = cookies.ANTE_UP_SESSION_TOKEN;
    } else {
        axios.defaults.headers.common['Authorization'] = null;
    }

    const api = axios.create({
        baseURL: 'https://api.jaspervandenmeiracker.nl/',
        timeout: 10000
    });


    async function buildConnection(connection) {
        try {
            await connection.start();
            props.dispatch(setConnection(connection));

            if (cookies.ANTE_UP_SESSION_TOKEN !== undefined) {
                let token = cookies.ANTE_UP_SESSION_TOKEN;
                await connection.invoke("Login", token);
            }
        } catch {
            console.log("Connection Failed")
        }
    }

    useEffect(() => {
        if (cookies.ANTE_UP_SESSION_TOKEN !== undefined && props.connection === undefined) {
            let connection = new HubConnectionBuilder()
                .withUrl("https://api.jaspervandenmeiracker.nl/antehub", {
                    skipNegotiation: true,
                    transport: HttpTransportType.WebSockets
                })
                .configureLogging(LogLevel.Information)
                .withAutomaticReconnect()
                .build();
            buildConnection(connection);
        }
        props.dispatch(setAPI(api));

    }, []);

    return <div style={{overflowX: "hidden"}}>
        <ThemeProvider applyTo={"body"} theme={darkTheme}>
            <Header/>
            <Router/>
            <Friends/>
        </ThemeProvider>
    </div>
}

const mapStateToProps = (state) => {
    return {
        connection: getGlobalConnection(state)
    };
};

export default connect(mapStateToProps)(App);