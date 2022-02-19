import React from "react";
import {Col, Row} from "react-grid-system";

function DepositButtons() {

    return <div>
        <Row style={{marginBottom: '10px'}}>
            <Col>
                <div className={'priceButton'}>
                    <div>
                        1k Credits
                    </div>
                    <div>10$</div>
                </div>
            </Col>
            <Col>
                <div className={'priceButton'}>
                    <div>
                        5k Credits
                    </div>
                    <div>50$</div>
                </div>
            </Col>
            <Col>
                <div className={'priceButton'}>
                    <div>
                        10k Credits
                    </div>
                    <div>100$</div>
                </div>
            </Col>
        </Row>
        <Row>
            <Col>
                <div className={'priceButton'}>
                    <div>
                        25k Credits
                    </div>
                    <div>250$</div>
                </div>
            </Col>
            <Col>
                <div className={'priceButton'}>
                    <div>
                        50k Credits
                    </div>
                    <div>500$</div>
                </div>
            </Col>
            <Col>
                <div className={'priceButton'}>
                    <div>
                        100k Credits
                    </div>
                    <div> 1000$</div>
                </div>
            </Col>
        </Row>
    </div>
}

export default DepositButtons;