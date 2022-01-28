import React, {useEffect, useState} from "react";
import {getAPI} from "../../../../Core/Global/global.selectors";
import {connect} from "react-redux";
import {Col, Row} from "react-bootstrap";
import AdminGameCard from "./AdminGameCard";
import CenteredLoader from "../../../Shared/CenteredLoader";
import AddGame from "./AddGame";

function AdminGames(props) {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getAllGames();
    }, [props.api]);

    function getAllGames() {
        if (props.api !== undefined) {
            setLoading(true)
            props.api.get('/Game').then(res => {
                setGames(res.data);
                setLoading(false)
            })
        }
    }

    return <div>
        {loading ? <CenteredLoader/> : <div style={{marginTop: '1vw'}}>
            <AddGame/>
            <Row sm={1} md={2} lg={5}>
                {games.map((Game) => (
                    <Col sm={12}>
                        <AdminGameCard key={Game.id} img={Game.image} name={Game.name}/>
                    </Col>
                ))}
            </Row>
        </div>}
    </div>
}

const mapStateToProps = (state) => {
    return {
        api: getAPI(state)
    };
};

export default connect(mapStateToProps)(AdminGames);