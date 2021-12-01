import React from "react";
import {Route} from "react-router-dom";
import Home from "./Pages/Home";
import {Col, Row} from "react-grid-system";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./Pages/Account/Entry/Login";
import ForgottenPassword from "./Pages/Account/Entry/ForgottenPassword";
import Register from "./Pages/Account/Entry/Register";
import Balance from "./Pages/Account/Settings/Balance";
import Lobbies from "./Pages/Game/Lobbies";
import Lobby from "./Pages/Game/Lobby";
import Account from "./Pages/Account/Settings";
import Admin from "./Pages/Admin";
import Footer from "./Shared/Footer/Footer";
import WagerModal from "./Pages/Game/Create Wager/WagerModal";

function Router() {
    return <div style={{ marginTop: "80px"}}>
        <Row>
            <Col sm={12} md={1} lg={1.5}/>
            <Col sm={12} md={10} lg={9}>
                <Route path="/account" component={Account}/>
                <Route path="/passwordforgotten" component={ForgottenPassword}/>
                <Route path="/admin" component={Admin}/>
                <Route exact path={"/game/:gameName"} render={(props) =>
                    <Lobbies gameName={props.match.params.gameName}/>
                }/>
                <Route exact path={"/lobby/:id"} render={(props) =>
                    <Lobby id={props.match.params.id}/>
                }/>
            </Col>
        </Row>

        <Route exact path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>

        <Footer/>
    </div>
}

export default Router;