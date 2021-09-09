import React from "react";
import {Route} from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Account/Login";
import Balance from "./Pages/Account/Balance";
import ForgottenPassword from "./Pages/Account/ForgottenPassword";
import Register from "./Pages/Account/Register";
import {Col, Row} from "react-grid-system";
import 'bootstrap/dist/css/bootstrap.min.css';

function Router(props){
    return <div style={{marginBottom:"20px"}}>
            <Row>
                <Col sm={12} md={1} lg={1}/>
                <Col sm={12} md={10} lg={10}>
                    <Route exact path="/" component={Home}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/balance" component={Balance}/>
                    <Route path="/passwordforgotten" component={ForgottenPassword}/>
                    <Route path="/register" component={Register}/>
                </Col>
                <Col sm={12} md={1} lg={1}/>
            </Row>
        </div>
}
export default Router;