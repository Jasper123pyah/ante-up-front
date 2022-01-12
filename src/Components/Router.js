import React from "react";
import {Route} from "react-router-dom";
import Home from "./Pages/Home";
import {Col, Row} from "react-grid-system";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./Pages/Account/Entry/Login";
import ForgottenPassword from "./Pages/Account/Entry/ForgottenPassword";
import Register from "./Pages/Account/Entry/Register";
import Lobby from "./Pages/Game/Lobby";
import Account from "./Pages/Account";
import Admin from "./Pages/Admin";
import Footer from "./Shared/Footer/Footer";
import Profile from "../Components/Pages/Account/Profile/index";
import Withdraw from "./Pages/Account/Balance/Withdraw";
import Deposit from "./Pages/Account/Balance/Deposit";
import LobbiesIndex from "./Pages/Game/Lobbies";

function Router() {
    return <div style={{ marginTop: "80px"}}>
        <Row>
            <Col sm={12} md={1} lg={1.5}/>
            <Col sm={12} md={10} lg={9}>
                <Route path="/passwordforgotten" component={ForgottenPassword}/>
                <Route path="/admin" component={Admin}/>
                <Route exact path={"/game/:gameName"} render={(props) =>
                    <LobbiesIndex gameName={props.match.params.gameName}/>
                }/>
                <Route exact path={"/lobby/:id"} render={(props) =>
                    <Lobby id={props.match.params.id}/>
                }/>
                <Route path={"/profile/:name"} render={(props) =>
                    <Profile name={props.match.params.name}/>}/>
                <Route path={"/account/:pivot"} render={(props) =>
                    <Account pivot={props.match.params.pivot}/>
                }/>
                <Route exact path={"/withdraw"} component={Withdraw}/>
                <Route exact path={"/deposit"} component={Deposit}/>
            </Col>
        </Row>

        <Route exact path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>

        <Footer/>
    </div>
}

export default Router;