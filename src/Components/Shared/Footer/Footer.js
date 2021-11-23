import React from "react";
import logo from "../../../Images/logo.png";
import './Footer.css'
import {Col, Row} from "react-grid-system";
import {FaTwitch, GrFacebook, GrInstagram, GrTwitter, SiDiscord} from "react-icons/all";
class Footer extends React.Component{

    render(){

        return<div className={"footer"}>
            <Row>
                <Col sm={12} md={1} lg={1.5}/>
                <Col sm={12} md={10} lg={9}>
                    <Row style={{marginLeft:"1vh"}}>
                        <Col sm={12} md={12} lg={6}>
                            <div style={{marginTop:"2vh", marginBottom:"2vh"}}>
                                <div>
                                    <img src={logo} style={{height: "43px", marginRight:"2vh"}} alt={"Logo"}></img>
                                    <GrInstagram className={"socialsIcon"}/>
                                    <GrFacebook className={"socialsIcon"}/>
                                    <SiDiscord className={"socialsIcon"}/>
                                    <GrTwitter className={"socialsIcon"}/>
                                    <FaTwitch className={"socialsIcon"}/>
                                </div>
                            </div>
                            <div>
                                ©2021 Ante-Up. All Rights Reserved
                            </div>
                            <div style={{width:"80%", marginBottom:"2vh"}}>
                                All content, games titles, trade names and/or trade dress, trademarks,
                                artwork and associated imagery are trademarks and/or copyright material
                                of their respective owners.
                            </div>
                        </Col>
                        <Col sm={12} md={12} lg={6}>
                            <Row style={{ paddingBottom:"2vh"}}>
                                <Col sm={12} md={6} lg={6}>
                                    <div style={{marginTop:"2vh"}}>
                                        <div><b style={{color:'#39ff13', fontSize:"18px"}}>Customer Service</b></div>
                                        <div>FAQ</div>
                                        <div>Rules</div>
                                        <div>Contact</div>
                                        <div>About Us</div>
                                    </div>
                                </Col>
                                <Col sm={12} md={6} lg={6}>
                                    <div style={{marginTop:"2vh"}}>
                                        <div><b style={{color:'#39ff13', fontSize:"18px"}}>Terms</b></div>
                                        <div>Terms of Service</div>
                                        <div>Privacy Policy</div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    }
}

export default Footer;
