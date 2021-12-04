import React from "react";
import {Col, Row} from "react-grid-system";
import {Link} from "react-router-dom";
import {GrPaypal} from "react-icons/all";
import './PreLogin.css';
import Gaming from "../../../../Images/gaming.jpg";
import SiteStats from "./SiteStats";

function MainScreen(){ // style={{ backgroundImage: `url(${Gaming})` }}
    return <div style={{marginTop:'10vh', marginBottom:"7vh"}}>
        <Row>
            <Col lg={1}/>
            <Col sm={12} md={4} lg={3}>
                <div style={{textAlign:'center', marginTop:"5vw", marginBottom:"2vh"}}>
                    <div style={{fontSize:"xxx-large"}}>Play games <br/> for cash</div>
                    <div style={{fontSize:"large", margin:'1vh'}}>Wager matches, play in tournaments, earn money while gaming.</div>
                    <Link className={'signUpLink'} to={"/register"}>Sign up now</Link>
                    <div style={{fontSize:"large"}}>Secure payments via:</div>
                    <GrPaypal className={"paymentIcon"}/>
                </div>
            </Col>
            <Col sm={12} md={8} lg={7}>
                <img style={{opacity:"0.5", width:"100%", borderRadius:'10px'}} src={Gaming}/>
            </Col>
            <Col lg={1}/>
        </Row>
        <div style={{width:'100%', height:'12vh'}}/>
       <SiteStats/>
    </div>
}

export default MainScreen;